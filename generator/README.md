# CV Generator

## Requirements

* [Task](https://taskfile.dev/installation/)
* [Docker + compose](https://docs.docker.com/get-docker/)

## Description

Generates the CV as HTML and PDF from `data/cv.json` using Symfony and Twig.

## Install

```bash
task init
```

## Usage

List all available tasks:

```bash
task
```

## URL parameters

The CV page supports query parameters to control visibility:

| Parameter  | Effect |
|------------|--------|
| `?public`  | Hides private contact info (email, phone, address). Links (GitHub, LinkedIn) remain visible. |
| `?download` | Shows the "Download PDF" button (hidden by default). |

Parameters can be combined: `?public&download`

## Contact me

My [Linkedin Profile](https://www.linkedin.com/in/david-piatek-519aa275/) or send me an email at dav.piatek@gmail.com
