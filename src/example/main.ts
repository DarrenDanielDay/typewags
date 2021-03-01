import path from "path";

export async function main() {}

if (process.cwd() === path.resolve(__dirname, "../..")) {
  main()
    .then(() => {
      console.log("Example done.");
    })
    .catch((e) => {
      console.log("Example crashed:", e);
    });
}
