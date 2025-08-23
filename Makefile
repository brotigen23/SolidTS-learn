.PHONY: run run-json
run:
	npm run dev

run-json:
	npx json-server --watch db.json --port 3001