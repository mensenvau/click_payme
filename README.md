# click-payme
click-payme


## Info 

- ```back-end: express , database: ms sql xoxlasangiz mysql o'tqaza olasiz!```

- ```config.json``` barcha sozlamalar saqlanadi . 
- Ularni olish uchun  https://merchant.payme.uz/ , https://merchant.click.uz/ saytlardan olasiz! 

- ```./DB/SQL.sql``` ichida 3ta table mavjud!. 

## Payme 

Siz oldin order yasagan bo'lshingiz kerag bo'ladi order tableda state=0 bo'lgan . keyin ushbu url ga yo'naltirasiz . 

```example.uz/payme/go?orderid=:orderid``` 

agar to'lov qilinsa order table da state=2 bo'ladi . 
xatolar uchun state=-2 , -1 bo'ladi . 



## Click 

Siz oldin order yasagan bo'lshingiz kerag bo'ladi order tableda state=0 , click_state =0 bo'lgan . keyin ushbu url ga yo'naltirasiz . 

```example.uz/click/go?orderid=:orderid``` 

agar to'lov qilinsa order table da state=2,click_state=1 bo'ladi . 
xatolar uchun state=-1 bo'ladi . 


---

```Xafsizlig taminlangan package.json va codni ko'ring! To'lov o'tish jarayoni password va SECRET_KEY bilan himoyalangan ularni olgandan keyin hichkimga bermang!```


Telegram: https://t.me/mensenvau 
Kansulatatsiya: https://t.me/balkibumen (otkir8311@gmail.com)