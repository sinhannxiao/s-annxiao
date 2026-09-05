# S. Ann Xiao — Portfolio

A static illustration portfolio designed as a quiet, handwritten picture book.

## Structure

```text
index.html
works/
  index.html      # collection chooser
  project.html    # proportional project gallery
src/
  main.js
  collections.js # all artwork groups and captions
  project.js     # collection/timeline renderer
  styles.css
  assets/images/
    projects/   # full-resolution source artwork, grouped by project
    ui/         # paper texture and supporting visual assets
    web/        # optimized images used by the live site
```

## Preview locally

From the repository root:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

The site has no build step or external runtime dependency. GitHub Pages can publish it directly from the repository root. Collection pages use a `?collection=` query parameter, for example `works/project.html?collection=peach-bun`.
