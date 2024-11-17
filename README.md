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

## Authors

* Poncho Dev Team

## Version History

* 0.1
    * Initial Release - Oct 8, 2024

## Acknowledgments

* [Chart.js](https://www.chartjs.org/)
* [DEX Screener API](https://docs.dexscreener.com/api/reference)
* [Font Awesome](https://fontawesome.com/)
* [jQuery](https://jquery.com/)
* [particles.js](https://vincentgarreau.com/particles.js/)
* [RealFaviconGenerator](https://realfavicongenerator.net/)
* [Swiper](https://swiperjs.com/swiper-api)