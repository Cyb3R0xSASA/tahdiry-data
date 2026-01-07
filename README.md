# tahdiry-data

-   Scrape tahdiry website data

# Steps:

## Stages

-   Req `GET /tt/get.php?stage_id=`
-   Params `ids: [1, 2,3 ,5,6]`
-   Test `GET /tt/get.php?stage_id=2`

### **response**

```json
{
    "data": [
        {
            "id": 4,
            "json_id": 6,
            "id_enc": "792CF72C0C5529675630924A6D8A250E",
            "code_id": null,
            "code_type": "K",
            "title": "الصف الأول الابتدائي",
            "education_level_id": null,
            "stage_id": 2,
            "track_id": null
        },
        ...
    ]
}
```

---

## Grades

-   Req `GET /tt/get.php?grade_id=`
-   Params `id: stages.data.id`
-   Test `GET /tt/get.php?grade_id=4`

### **response**

```json
{
    "data": [
        {
            "id": 34,
            "item_index": 4,
            "title": "الفصل الدراسي الثاني",
            "codeId": "SM1",
            "codeType": "SM",
            "fullPath": "5142-3-6-34",
            "parentId": 6,
            "orderInParent": 1,
            "isParent": 1,
            "unitID": null,
            "chapterId": null,
            "directParentId": 4,
            "created_at": "2025-12-29 21:21:22"
        }
    ]
}
```

---

## Terms

-   Req `GET /tt/get.php?term_id=`
-   Params `id: term.data.id`
-   Test `GET /tt/get.php?grade_id=34`

### **response**

```json
{
    "data": [
        {
            "id": 273,
            "title": "اللغة العربية",
            "parent_type": "SEMESTER",
            "parent_id": 34,
            "is_extra": false
        },
        ...
    ]
}
```

---

## Subjects

-   Req `GET /tt/get.php?p_subj={?}&ex_sem_id={?}&a=p`
-   Params `id: term.data.id`
-   Test `GET /tt/get.php?p_subj={273}&ex_sem_id={34}&a=p`

### **response**

```json
[
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وسلامتي-> مدخل الوحدة الرابعة</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>مُرَاجَعَةُ الْحُرُوفِ الَّتِي سَبَقَتْ دِرَاسَتُهَا فِي الجزء الأول من المقرر</div><div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وسلامتي->الدرس الأول حرف (ض)</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وسلامتي->الدرس الثاني حرف (ع)</div>",
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وسلامتي->الدرس الثالث حرف (ك)</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وسلامتي->الدرس الرابع حرف (خ)</div>",
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وسلامتي->الدرس الرابع حرف (خ)</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وسلامتي-> الدرس الخامس حرف (ي)</div>",
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وسلامتي-> الدرس الخامس حرف (ي)</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>التقويم التجميعي</div><div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وسلامتي-> الدرس السادس حرف (ذ)</div>",
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وسلامتي-> الدرس السادس حرف (ذ)</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>ألعابي وهواياتي->مدخل الوحدة</div><div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>ألعابي وهواياتي->الدرس الأول حرف (هـ)</div>",
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>ألعابي وهواياتي->الدرس الأول حرف (هـ)</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>ألعابي وهواياتي->الدرس الثاني حرف (ث)</div>",
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>ألعابي وهواياتي->الدرس الثاني حرف (ث)</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>التقويم التجميعي</div><div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>ألعابي وهواياتي->الدرس الثالث حرف (غ)</div>",
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>ألعابي وهواياتي->الدرس الثالث حرف (غ)</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>ألعابي وهواياتي->الدرس الرابع حرف (ظ)</div>",
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وغذائي->مدخل الوحدة</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وغذائي->طعام ملوث</div><div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وغذائي->فيه شفاء</div>",
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وغذائي->فيه شفاء</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>التقويم التجميعي</div><div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وغذائي->عيادة المريض</div>",
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وغذائي->عيادة المريض</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>صحتي وغذائي->أعضاء جسمي</div>",
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>حيوانات->مدخل الوحدة</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>حيوانات->التعاون</div><div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>حيوانات->الخروف والذئب</div>",
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>حيوانات->الخروف والذئب</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>التقويم التجميعي</div><div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>حيوانات->تعلمت درسًا</div>",
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>حيوانات->تعلمت درسًا</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>حيوانات->الثعلب والعصفور الصغير</div>",
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>مناسبات->مدخل الوحدة</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>مناسبات->نورة وشهر رمضان</div><div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>مناسبات->ضيف جديد</div>",
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>مناسبات->ضيف جديد</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>التقويم التجميعي</div><div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>مناسبات->الشجرة الحزينة</div>",
    "<div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>مناسبات->الشجرة الحزينة</div><div style='color: #399e16;background-color: #e0f0ff57; border-radius: 14px; padding: 3px; margin-top: 4px;    text-align: center;; font-weight: bold;font-size: 17px;'>مراجعة</div><div style='color: #0b96d4;background-color: #e0ffee63; border-radius: 14px; padding: 3px; margin-top: 4px;text-align: center;; font-weight: bold;font-size: 17px;'>مناسبات->يوم الأرض</div>"
]
```
