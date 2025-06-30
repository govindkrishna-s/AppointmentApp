// rename-project.js
import fs from 'fs';
import path from 'path';
import readline from 'readline';

// --- Configuration ---
// You can hardcode the new name here to skip the prompt
const NEW_PROJECT_NAME = "";
// ---------------------

// Helper for colored console output
const colors = {
  success: '\x1b[32m', // Green
  warning: '\x1b[33m', // Yellow
  error: '\x1b[31m',   // Red
  reset: '\x1b[0m'
};

const log = (message, color = colors.reset) => console.log(`${color}%s${colors.reset}`, message);

const askQuestion = (query) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }));
};

/**
 * Converts a slug-case name to Title Case for use in titles.
 * e.g., 'my-new-app' -> 'My New App'
 * @param {string} slug - The slug-case project name.
 * @returns {string} The name in Title Case.
 */
const toTitleCase = (slug) => {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

async function main() {
    log("--- React + Vite Project Renamer ---", colors.warning);

    const projectRoot = process.cwd();
    const packageJsonPath = path.join(projectRoot, 'package.json');
    const indexHtmlPath = path.join(projectRoot, 'index.html');
    const readmePath = path.join(projectRoot, 'README.md');

    // 1. Validate we're in a Vite project
    if (!fs.existsSync(packageJsonPath)) {
        log("Error: package.json not found. Are you in the root of your Vite project?", colors.error);
        process.exit(1);
    }
    
    // 2. Get old and new project names
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const oldName = packageJson.name;
    const newName = NEW_PROJECT_NAME || await askQuestion(`Enter the new project name (e.g., my-cool-app): `);

    if (!newName || newName.includes(' ') || newName.toLowerCase() !== newName) {
        log("Error: Invalid name. It must be lowercase and contain no spaces.", colors.error);
        process.exit(1);
    }
    if (newName === oldName) {
        log("The new name is the same as the old name. No changes made.", colors.warning);
        process.exit(0);
    }
    
    log(`\nRenaming project from "${oldName}" to "${newName}"...`);

    try {
        // 3. Update package.json
        packageJson.name = newName;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
        log("✓ Updated package.json", colors.success);

        // 4. Update index.html title
        if (fs.existsSync(indexHtmlPath)) {
            let indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
            const newTitle = toTitleCase(newName);
            indexHtmlContent = indexHtmlContent.replace(/<title>.*<\/title>/, `<title>${newTitle}</title>`);
            fs.writeFileSync(indexHtmlPath, indexHtmlContent);
            log("✓ Updated index.html title", colors.success);
        } else {
            log("Warning: index.html not found, skipping title update.", colors.warning);
        }

        // 5. Update README.md
        if (fs.existsSync(readmePath)) {
            let readmeContent = fs.readFileSync(readmePath, 'utf8');
            // Replaces the first line if it matches the old project name, e.g., # old-name
            readmeContent = readmeContent.replace(new RegExp(`^# ${oldName}`), `# ${newName}`);
            fs.writeFileSync(readmePath, readmeContent);
            log("✓ Updated README.md", colors.success);
        }

    } catch (error) {
        log(`An error occurred: ${error.message}`, colors.error);
        process.exit(1);
    }

    log("\n--- ✅ Internal files renamed successfully! ---", colors.success);
    log("\n--- IMPORTANT FINAL STEP ---", colors.warning);
    log("The script cannot rename the project's root folder itself.");
    log("You must do this manually.");
    log("\n1. Go to the parent directory (cd ..).");
    const parentDir = path.basename(projectRoot);
    log(`2. Manually rename the folder: \n   mv ${parentDir} ${newName}`);
    log("\n3. After renaming, navigate into your project and run 'npm install'.");
}

main().catch(error => {
    log(`A critical error occurred: ${error.message}`, colors.error);
});