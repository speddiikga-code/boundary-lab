# Boundary Lab

**An interactive field guide to evidence-driven security audits.**

[Website](https://speddiikga-code.github.io/boundary-lab/) · [GitHub](https://github.com/speddiikga-code/boundary-lab) · [Upstream project](https://github.com/cloudflare/security-audit-skill)

Boundary Lab is an independent, English-language guide to the security-audit workflow described in Cloudflare's `security-audit-skill`. Explore audit domains, follow the six-phase process, and inspect an illustrative report in a responsive interface.

The website is a **static guide and interactive demonstration**. It does not scan repositories or perform live security audits. Sample findings are fictional examples for learning, not results from an analyzed codebase.

## Features

- Responsive layouts for desktop, tablet, and mobile screens.
- A searchable, filterable library of security audit domains.
- A six-phase guide covering reconnaissance, hunting, validation, structured output, independent verification, and reporting.
- A sample report explaining the `confirmed`, `needs_validation`, and `rejected` verdicts.
- A copyable upstream installation command and links to the original documentation.
- A reusable [English-only conversation prompt](ENGLISH-ONLY-PROMPT.md).

## Run locally

Download or clone this repository, open a terminal in its root directory, and run:

```sh
python -m http.server 8080
```

Open <http://localhost:8080> in your browser. The site uses static files and requires no build step or package installation.

## Publish with GitHub Pages

1. Create a new public repository named `boundary-lab` on GitHub.
2. Upload the site files to its `main` branch, keeping `index.html`, the stylesheet, script, and `.nojekyll` at the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select **main** and **/ (root)**, then save.
6. Once deployment completes, open [Boundary Lab](https://speddiikga-code.github.io/boundary-lab/).

The root `.nojekyll` file keeps GitHub Pages from processing the site with Jekyll. Subsequent pushes to `main` publish updated static files.

## Use the original audit skill

Actual audits run separately in a compatible coding-agent environment. The upstream README provides this installation command:

```sh
npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit
```

Consult the preserved [upstream README](README.upstream.md) or [original repository](https://github.com/cloudflare/security-audit-skill) for requirements, sandbox constraints, and complete instructions. Opening this website or copying its command does not install or execute the skill.

This repository contains the website, upstream README, and license. It does not redistribute the upstream `skills` directory; the upstream links remain the source for those files.

## Attribution and license

Based on [Cloudflare / security-audit-skill](https://github.com/cloudflare/security-audit-skill), Copyright © 2025–2026 Cloudflare, Inc.

Boundary Lab is an independent adaptation. It is not an official Cloudflare service and does not imply Cloudflare endorsement.

The original MIT license is preserved in [LICENSE](LICENSE), and the original project description is preserved in [README.upstream.md](README.upstream.md).
