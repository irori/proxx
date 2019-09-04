URL=https://proxx.app/

set -e

npm run build
rm -f dist/*.gz dist/*.map dist/assets/*.gz
gen-bundle -dir dist -baseURL $URL -primaryURL $URL -o proxx.wbn -manifestURL $URL/manifest.json
