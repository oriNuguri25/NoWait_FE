const fs = require("fs-extra");

async function main() {
  // dist 비우기
  await fs.emptyDir("dist");

  // user 앱 빌드 결과 -> dist/
  await fs.copy("apps/nowait-user/dist", "dist");

  // admin 앱 빌드 결과 -> dist/admin
  await fs.copy("apps/nowait-admin/dist", "dist/admin");
}

main();
