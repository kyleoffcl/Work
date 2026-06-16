#!/usr/bin/env bash
# Download the AI-generated CDN images into assets/ and rewrite index.html to
# reference local paths. Run from a machine with normal internet access.
set -euo pipefail

CDN="https://d8j0ntlcm91z4.cloudfront.net/user_3F827eIDXoLuc7sxQ7MR3SYr022"
mkdir -p assets/programs

declare -A FILES=(
  ["assets/hero.jpg"]="hf_20260616_205215_45da80e4-646d-4d3b-9a3e-6833da8fc3ff.png"
  ["assets/programs/adults.jpg"]="hf_20260616_205228_1127b8fb-ed16-4bc5-9cac-270bc3294ab9.png"
  ["assets/programs/kids.jpg"]="hf_20260616_205230_91b5ac17-c009-4eca-848d-e3b0a8a8d0c0.png"
  ["assets/programs/nogi.jpg"]="hf_20260616_205233_daf45c50-96fc-45b6-a0ec-2e653424d8c8.png"
  ["assets/coach.jpg"]="hf_20260616_205235_ce890c0c-0d76-4aa1-8174-dd990fbba581.png"
)

for path in "${!FILES[@]}"; do
  echo "Downloading $path ..."
  curl -fsSL -o "$path" "$CDN/${FILES[$path]}"
done

echo "Rewriting index.html to use local asset paths ..."
sed -i \
  -e "s#$CDN/hf_20260616_205215_45da80e4-646d-4d3b-9a3e-6833da8fc3ff.png#assets/hero.jpg#g" \
  -e "s#$CDN/hf_20260616_205228_1127b8fb-ed16-4bc5-9cac-270bc3294ab9.png#assets/programs/adults.jpg#g" \
  -e "s#$CDN/hf_20260616_205230_91b5ac17-c009-4eca-848d-e3b0a8a8d0c0.png#assets/programs/kids.jpg#g" \
  -e "s#$CDN/hf_20260616_205233_daf45c50-96fc-45b6-a0ec-2e653424d8c8.png#assets/programs/nogi.jpg#g" \
  -e "s#$CDN/hf_20260616_205235_ce890c0c-0d76-4aa1-8174-dd990fbba581.png#assets/coach.jpg#g" \
  index.html

echo "Done. Images are now local under assets/."
