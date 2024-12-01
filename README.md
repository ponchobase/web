# Project Title

Poncho on Base

## Description

Official Poncho Website

## Getting Started

* GitHub repo: https://github.com/ponchobase/files
* GitHub author: https://stackoverflow.com/a/43231587
* Git Access Token: 
```
My Account → Settings → Developer settings → Personal access tokens → Generate new token
git remote set-url origin https://<token>@github.com/<username>/<repo> 
```

### Local

* XAMPP: https://www.apachefriends.org/download.html 
* XAMPP / xamppfiles / etc / httpd.conf
```
Listen 80
```
* XAMPP / xamppfiles / apache2 / conf / httpd.conf
```
<VirtualHost *:80>
    DocumentRoot "/Applications/XAMPP/xamppfiles/htdocs/ponchobase"
    ServerName local.ponchobase.com
    ServerAlias local.ponchobase.com
</VirtualHost>
```

### Production

* github-pages: https://github.com/ponchobase/files/deployments/github-pages

### GIT
```
Branch
git switch -c <new_branch> # to create a new branch and switch to it
git switch <branch> # to switch to an existing branch
git branch --show-current # show current branch name
git push origin -d <branchname> # Delete remote branch
git branch -d <branchname> # Delete local branch
```
```
Merge 
git checkout main
git pull origin main
git merge branch
git push origin main
```

### Handlebars

* Go to _gulp/src/js/templates and run: 
```
handlebars *.handlebars -f ../../../../dist/js/templates.js
```

## Authors

* Poncho Dev Team

## Version History

* 0.1
    * Initial Release - Oct 8, 2024

## Acknowledgments

* [Chart.js](https://www.chartjs.org/)
* [DEX Screener API](https://docs.dexscreener.com/api/reference)
* [Font Awesome](https://fontawesome.com/)
* [Handlebars](https://handlebarsjs.com/)
* [jQuery](https://jquery.com/)
* [particles.js](https://vincentgarreau.com/particles.js/)
* [RealFaviconGenerator](https://realfavicongenerator.net/)
* [Swiper](https://swiperjs.com/swiper-api)