import * as fs from 'fs';

const TEMPLATE_FILE = 'resources/template.md';
const TARGET_FILE = 'README.md';

interface Repo {
    name: string; // e.g. sbt
    github: string; // e.g. sbt/sbt
}

const resources: Record<string, Repo[]> = {
    'Runtimes': [
        {name: 'Node.js', github: 'nodejs/node'},
        {name: 'Deno', github: 'denoland/deno'},
    ],
    'Languages': [
        {name: 'Scala', github: 'scala/scala'},
        {name: 'Scala 3 (dotty)', github: 'lampepfl/dotty'},
        {name: 'Kotlin', github: 'JetBrains/kotlin'},
        {name: 'TypeScript', github: 'microsoft/TypeScript'},
    ],
    'Libraries / Frameworks': [
        {name: 'Spring Framework', github: 'spring-projects/spring-framework'},
        {name: 'Spring Boot', github: 'spring-projects/spring-boot'},
        {name: 'Micronaut', github: 'micronaut-projects/micronaut-core'},
        {name: 'Nest', github: 'nestjs/nest'},
    ],
    'Build tools': [
        {name: 'sbt', github: 'sbt/sbt'},
        {name: 'Maven', github: 'apache/maven'},
        {name: 'Gradle', github: 'gradle/gradle'},
    ],

};

console.log('Baking tables...')

const tables = Object.entries(resources)
    .map(([category, repos]) => {

        const title = `### ${category}`
        const header =
            '| Repo | Version |\n' +
            '|------|---------|'

        const rows = repos
            .map(({name, github}) => {
                const link = `[${name}](https://github.com/${github})`;
                const shield = `![${name} latest release](https://img.shields.io/github/v/release/${github}?label=${encodeURIComponent(name)})`;
                return `| ${link} | ${shield} |`;
            })
            .join('\n');

        return [title, header, rows].join('\n');

    })
    .join('\n\n');

console.log(`Reading template file ${TEMPLATE_FILE}...`)
const template = fs.readFileSync(TEMPLATE_FILE).toString('utf-8');

console.log('Applying template file...')
const content = template.replace('${CONTENT}', tables)

fs.writeFileSync(TARGET_FILE, content)

console.log(`Done! Checkout target file: ${TARGET_FILE}`)
