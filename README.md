# dbrmn-architecture-tool

## The template

This is a repo template to serve you and the project a solid foundation of tools for architectural decisions, ADR and other things to enable better decisions and knowledge sharing.

## Setup

This repository is a template, so upon creating a new repository, click `use template` and choose `dbrmn-architecture-tool` or use the short cut on this page `use this template`. You'll get an initial commit holding all content from this repository.

### 1. Fill out technical requirements

- [`/docs/technical-requirements.md`](/docs/technical-requirements.md) is a template to fill out the requirements for the project, some guidance is offered as comments in the file.

### 2. Create evaluation matrix

- Create a new spreadsheet from [the evaluation matrix template](https://docs.google.com/spreadsheets/d/1UjQwhPr8V_S2BBn42OWzYmrl2ribgXby8e7f_nhpMLo/template/preview).
- When the matrix is done, create a markdown table from it using [Tables Generator](https://www.tablesgenerator.com/markdown_tables) or [sheetdown](https://github.com/jlord/sheetdown).
- Save the markdown formatted table in [`/docs/evaluations`](./docs/evaluations).

### 3. Create ADRs

- [`/docs/adr`](/docs/adr) holds ADRs(Architectural Decision Records), to create a new, simply copy the template, update name and id of it.

### 4. Upload drawings

- [`/docs/drawings`](/docs/drawings) hold architectural images, upload existing images or ideally use the draw.io [vscode plugin](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) to create a new. Name the file `[name].drawio.svg` and commit. Et voilà!

### 5. Remove this section

Remove this headline and everything above it and continue using whats below as a starting point for your projects README.md.

# Project title

Short project description and project background

## Getting started

Everything a developer needs to get a fully functioning developments setup and running.

## Environments

What environments are there and how does this project manage those environments.

## Tests

Describe how to run tests and, in short, how to write tests. Also outline any testing
strategy here.

## Deployment

How is this project deployed? Describe the manual deployment process or the CI/CD flow.

## Documentation

This project contains difference kinds of documentation under the [`/docs`](/docs) folder.

### [`/docs/technical-requirements.md`](/docs/technical-requirements.md)

This document contains the gathered technical requirements that are relevant to this project. This includes requirements such as security, data management, hosting, performance and integrations.

This documentation is useful as input when writing an ADR.

### [`/docs/adr`](/docs/adr)

This folder contains ARD:s, architectural decision records. ADR:s are a useful way
to document decisions made during the length of the project. See the example ADR at
[`/docs/adr/0001-record-architecture-decisions.md`](/docs/adr/0001-record-architecture-decisions.md) for further information on what
an ADR is and how to write one.

### [`/docs/evaluations`](/docs/evaluations)

This folder contains documentation on evaluations made during a decision process. In essence, each evaluation contains a spreadsheet with the different alternatives and the evaluation criteriums. Each criterium is assigned a weight to represent the criteriums importance to the decision. Each alternative gets a score for each of the criteriums. In the end each alternative recieves a total score which is the sum of the factors of the criterium weights and scores.

This documentation is useful as input when writing an ADR.

### [`/docs/drawings`](/docs/drawings)

This folder contains drawings of the project architecture (or anything else really) made with draw.io. See [draw.io](https://draw.io). There is a usefule VSCode plugin for editing draw.io diagrams directly in VSCode, see [Draw.io VS Code Integration](https://github.com/hediet/vscode-drawio)

This documentation is useful as input when writing an ADR.

## Contacts and nice to knows

Are there any people that are important for developers to know about and how to contact? List those people along with their responsibilities. Also include any other bits of information that can be useful for a developer to know.
