dev:
	npx vite

types:
	node scripts/build-types.mjs

test: types
	node scripts/check-source.mjs

deploy:
	npx vercel --prod

watch:
	python3 ./scripts/watch-tot-cmp-zip.py

purge:
	@echo "Purging jsdelivr cache for all files in src/..."
	@find src -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" \) | while read file; do \
		echo "Purging $$file"; \
		curl -s "https://purge.jsdelivr.net/gh/anatol-grabowski/tot-components@main/$$file" > /dev/null; \
	done
	@echo "Purge complete."
