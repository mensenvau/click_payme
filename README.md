# click-payme
click-payme

 [mensenvau/click-payme](https://github.com/mensenvau/click-payme.git) github dan yuklang  

## Info 

- ```back-end: express , database: ms sql xoxlasangiz mysql o'tqaza olasiz!```

- ```config.json``` barcha sozlamalar saqlanadi . 
- ularni olish uchun  https://merchant.payme.uz/ , https://merchant.click.uz/ saytlardan olasiz! yoki tegshli xodimlarga murojat qiling!

- ```./DB/SQL.sql``` ichida 3ta table mavjud!. 

## Payme 

Siz oldin order yasagan bo'lshingiz kerag bo'ladi order table da state=0 bo'lgan . keyin ushbu url ga yo'naltirasiz . 

```https://example.uz/payme/go?orderid=:orderid``` 

agar to'lov qilinsa order table da state=2 bo'ladi . 
xatolar uchun state=-2 , -1 bo'ladi . 



## Click 

Siz oldin order yasagan bo'lshingiz kerag bo'ladi order table da state=0 , click_state =0 bo'lgan . keyin ushbu url ga yo'naltirasiz . 

```https://example.uz/click/go?orderid=:orderid``` 

agar to'lov qilinsa order table da state=2,click_state=1 bo'ladi . 
xatolar uchun state=-1 bo'ladi . 


---

```Xafsizlig taminlangan package.json va codni ko'ring! To'lov o'tish jarayoni password va SECRET_KEY bilan himoyalangan ularni olgandan keyin hichkimga bermang!```


Telegram: https://t.me/mensenvau 
Konsultatsiya: https://t.me/balkibumen (otkir8311@gmail.com)


<img src="https://camo.githubusercontent.com/090f8272e5019338ffa5cdb8981144bc257fd8ccfe511fda5de1c9d5271cfeb3/68747470733a2f2f76697369746f722d62616467652e676c697463682e6d652f62616467653f706167655f69643d6d656e73656e7661752e6d656e73656e766175" alt="" data-canonical-src="https://visitor-badge.glitch.me/badge?page_id=mensenvau.mensenvau" style="max-width: 100%;">