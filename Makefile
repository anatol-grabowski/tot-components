dev:
	npx vite

test:
	node scripts/check-source.mjs

deploy:
	npx vercel --prod

watch:
	./scripts/watch-tot-cmp-zip.py
