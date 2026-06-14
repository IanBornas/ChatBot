const { spawn } = require("node:child_process");

const isWindows = process.platform === "win32";
const npm = "npm";

const commands = [
    {
        name: "server",
        command: npm,
        args: ["--prefix", "server", "run", "dev"]
    },
    {
        name: "client",
        command: npm,
        args: ["run", "dev:client"]
    }
];

const children = commands.map(({ name, command, args }) => {
    const child = spawn(command, args, {
        stdio: "inherit",
        shell: isWindows
    });

    child.on("exit", (code, signal) => {
        if (signal) {
            console.log(`${name} stopped with signal ${signal}`);
            return;
        }

        if (code !== 0) {
            console.log(`${name} exited with code ${code}`);
            shutdown(code);
        }
    });

    return child;
});

function shutdown(code = 0) {
    for (const child of children) {
        if (!child.killed) {
            child.kill();
        }
    }

    process.exit(code);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
