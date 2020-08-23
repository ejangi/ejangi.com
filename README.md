# ejangi.com

> This [hugo](https://gohugo.io) website is my personal website.

## How this site was created

1) Build and run the docker image:

```bash
docker-compose build
docker-compose run app bash
```

2) From the bash prompt, create a new hugo site in the current directory:

```bash
hugo new site . --force
```

3) Update the `config.toml` file with the settings for this website.

4) Create a new theme:

```bash
hugo new theme <theme-name>
```

*Good to go!* Simply exit out of the container and bring the container up to start developing the site:

```bash
docker-compose up
```

### Adding SASS

Gosh, the documentation on this is hopeless... So, here it is in a nutshell.

1) In your theme folder, create `assets/scss/main.scss`.

2) Wherever you want the uri for the compiled CSS, add the following:

```html
{{ $sass := resources.Get "scss/main.scss"  | resources.ToCSS (dict "outputStyle" "compressed") | fingerprint }}
<link rel="stylesheet" href="{{ $sass.Permalink }}">
```