#!/usr/bin/env python3

import fnmatch
import os
import shutil
import subprocess
import sys
import time
import zipfile
from pathlib import Path


DOWNLOADS_DIR = Path.home() / 'Downloads'
TARGET_DIR = Path('/Users/anatol.hrabouski/_tot/proj/tot-components')
ZIP_PATTERN = 'tot-components-*.zip'
POLL_SECONDS = 2
STABLE_CHECK_SECONDS = 1


def ask_yes_no(question):
  while True:
    answer = input(f'{question} [y/n]: ').strip().lower()

    if answer in ('y', 'yes'):
      return True

    if answer in ('n', 'no'):
      return False

    print('Please answer y or n.')


def wait_until_file_is_stable(path):
  while True:
    try:
      first_stat = path.stat()
      time.sleep(STABLE_CHECK_SECONDS)
      second_stat = path.stat()
    except FileNotFoundError:
      return False

    if (
      first_stat.st_size == second_stat.st_size
      and first_stat.st_mtime == second_stat.st_mtime
    ):
      return True


def get_single_top_level_dir(zip_file):
  top_level_names = set()

  for info in zip_file.infolist():
    name = info.filename

    if not name or name.startswith('__MACOSX/'):
      continue

    parts = Path(name).parts

    if not parts:
      continue

    top_level_names.add(parts[0])

  if len(top_level_names) != 1:
    raise ValueError(
      f'Expected exactly one top-level directory, found: {sorted(top_level_names)}'
    )

  return next(iter(top_level_names))


def safe_extract_zip_dir_contents(zip_path, target_dir):
  temp_dir = Path.cwd() / f'.tmp_extract_{int(time.time())}'

  if temp_dir.exists():
    shutil.rmtree(temp_dir)

  temp_dir.mkdir(parents=True)

  try:
    with zipfile.ZipFile(zip_path) as zip_file:
      root_dir_name = get_single_top_level_dir(zip_file)

      for info in zip_file.infolist():
        name = info.filename

        if not name or name.startswith('__MACOSX/'):
          continue

        parts = Path(name).parts

        if not parts or parts[0] != root_dir_name:
          continue

        relative_parts = parts[1:]

        if not relative_parts:
          continue

        destination = temp_dir.joinpath(*relative_parts).resolve()
        temp_root = temp_dir.resolve()

        if not str(destination).startswith(str(temp_root) + os.sep):
          raise ValueError(f'Unsafe zip path: {name}')

        if info.is_dir():
          destination.mkdir(parents=True, exist_ok=True)
          continue

        destination.parent.mkdir(parents=True, exist_ok=True)

        with zip_file.open(info) as source:
          with open(destination, 'wb') as target:
            shutil.copyfileobj(source, target)

    copy_tree_overwrite(temp_dir, target_dir)
  finally:
    if temp_dir.exists():
      shutil.rmtree(temp_dir)


def copy_tree_overwrite(source_dir, target_dir):
  target_dir.mkdir(parents=True, exist_ok=True)

  for root, dirs, files in os.walk(source_dir):
    source_root = Path(root)
    relative_root = source_root.relative_to(source_dir)
    target_root = target_dir / relative_root

    target_root.mkdir(parents=True, exist_ok=True)

    for dirname in dirs:
      (target_root / dirname).mkdir(parents=True, exist_ok=True)

    for filename in files:
      source_file = source_root / filename
      target_file = target_root / filename

      shutil.copy2(source_file, target_file)


def run_deploy():
  result = subprocess.run(
    ['npm', 'run', 'deploy'],
    cwd=TARGET_DIR,
  )

  if result.returncode != 0:
    print(f'npm run deploy failed with exit code {result.returncode}')


def handle_zip(path):
  print()
  print(f'New zip found: {path}')

  if not ask_yes_no('Act on this zip?'):
    print('Ignored.')
    return

  print(f'Extracting into: {TARGET_DIR}')
  safe_extract_zip_dir_contents(path, TARGET_DIR)
  print('Extraction complete.')

  if ask_yes_no('Run "npm run deploy" now?'):
    run_deploy()
  else:
    print('Deploy skipped.')


def is_matching_zip(path):
  return (
    path.is_file()
    and fnmatch.fnmatch(path.name, ZIP_PATTERN)
    and not path.name.startswith('.')
  )


def main():
  if not DOWNLOADS_DIR.exists():
    print(f'Downloads directory does not exist: {DOWNLOADS_DIR}', file=sys.stderr)
    return 1

  print(f'Watching: {DOWNLOADS_DIR}')
  print(f'Pattern: {ZIP_PATTERN}')
  print(f'Target: {TARGET_DIR}')
  print('Existing matching files are ignored. Waiting for new zips...')

  seen = {
    path.resolve()
    for path in DOWNLOADS_DIR.iterdir()
    if is_matching_zip(path)
  }

  try:
    while True:
      current = [
        path.resolve()
        for path in DOWNLOADS_DIR.iterdir()
        if is_matching_zip(path)
      ]

      for path in current:
        if path in seen:
          continue

        seen.add(path)

        if wait_until_file_is_stable(path):
          try:
            handle_zip(path)
          except Exception as error:
            print(f'Error handling {path}: {error}', file=sys.stderr)

        print()
        print('Waiting for new zips...')

      time.sleep(POLL_SECONDS)

  except KeyboardInterrupt:
    print()
    print('Stopped.')
    return 0


if __name__ == '__main__':
  raise SystemExit(main())