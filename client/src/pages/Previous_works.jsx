import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
//improt images
import paperwork from "../assets/images/paperwork.jpg";
import about_1 from "../assets/images/about1.webp";
import about_2 from "../assets/images/about2.webp";
import about_3 from "../assets/images/about3.webp";
import about_4 from "../assets/images/about4.jpg";
import about_5 from "../assets/images/about5.webp";
import about_6 from "../assets/images/about6.webp";
import about_7 from "../assets/images/about7.webp";
import about_8 from "../assets/images/about8.webp";
import "../assets/style/common/aboutPages.css";
import AnimatedContent from "../components/AnimatedContent";

import { motion } from "framer-motion";
export default function Previous_works() {
  return (
    <motion.div
      className="about-pages"
      dir="auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      <div className="headerimg">
        <AnimatedContent delay={0.2} threshold={0} duration={2}>
          <h1>سابقة الأعمال</h1>
        </AnimatedContent>
        <img src={paperwork} alt="" />
      </div>
      <div className="cards">
        <h2>منذ 2010، قمنا بمساعدة الكثير، وما زلنا مستمرين.</h2>
        <AnimatedContent delay={0.2} threshold={0.1} duration={2}>
          <div className="card">
            <div className="top">
              <span>شارك</span>
              <p>للإستشارات</p>
            </div>
            <div className="img">
              <img src={about_1} alt="" />
            </div>
            <div className="text">
              <p>
                هي شركة تعمل على إعداد دراسات الجدوى للعملاء في دول مجلس التعاون
                قطر والامارات والسعودية وعمان.
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent delay={0.2} threshold={0.1} duration={2}>
          <div className="card">
            <div className="top">
              <span>منذ</span>
              <p>2010</p>
            </div>
            <div className="img">
              <img src={about_4} alt="" />
            </div>
            <div className="text">
              <p>
                قدم فريق عمل شارِك للإستشارات داخل السوق الخليجي خدمات متنوعة
                للمستثمرين حيث تم تقديم اكثر من 1150 دراسة جدوى بداية من عام
                2010.
              </p>
            </div>
          </div>
        </AnimatedContent>

        <AnimatedContent delay={0.2} threshold={0.1} duration={2}>
          <div className="card">
            <div className="top">
              <span>توسع</span>
              <p></p>
            </div>
            <div className="img">
              <img src={about_5} alt="" />
            </div>
            <div className="text">
              <p>
                استمر فريق عمل الشركة في تقديم الخدمات للعملاء وتم التوسع الافقي
                والرأسي لانشطة الشركة لتشمل 4 دول خليجية بالاضافة إلى خدمات
                اضافية مثل الإستشارات الإدارية والمتابعة مع العملاء بصفة شهرية
                وتقديم تقارير تخص كل فترة وطرق التطوير.
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent delay={0.2} threshold={0.1} duration={2}>
          <div className="card">
            <div className="top">
              <span>تطوير</span>
              <p>الأعمال</p>
            </div>
            <div className="img">
              <img src={about_6} alt="" />
            </div>
            <div className="text">
              <p>
                تقدم الشركة خدمات تطوير الأعمال للمشروعات الجديدة والقائمة من
                خلال متابعة دورية وادارة الازمات للشركات بالاضافة إلى ادارة
                الطوارئ المستمرة.
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent delay={0.2} threshold={0.1} duration={2}>
          <div className="card">
            <div className="top">
              <span>1120+</span>
              <p>دراسة جدوى</p>
            </div>
            <div className="img">
              <img src={about_2} alt="" />
            </div>
            <div className="text">
              <p>
                تم تقديم دراسة جدوى لعدد 730 مصنع وعدد 138 دراسة جدوى لمشروع
                مطعم وكافيه وعدد 39 مزرعة بالاضافة إلى 24 دراسة جدوى مدرسة وعدد
                91 دراسة جدوى تطبيق الكتروني وعدد 14 دراسة جدوى مشروع طبي
                بالاضافة إلى اكثر من 84 دراسة جدوى لمشروعات اخرى.
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent delay={0.2} threshold={0.1} duration={2}>
          <div className="card">
            <div className="top">
              <span>الفريق</span>
              <p></p>
            </div>
            <div className="img">
              <img src={about_3} alt="" />
            </div>
            <div className="text">
              <p>
                تم تطوير فريق العمل بالشركة بصفة تدريجية بالاضافة إلى انه يتم
                الاستعانة باستشاريين خارجيين عند الحاجة اليهم اثناء إعداد بعض
                دراسات الجدوى المتخصصة في بعض القطاعات.
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent delay={0.2} threshold={0.1} duration={2}>
          <div className="card">
            <div className="top">
              <span>متابعة</span>
              <p>الاجراءات</p>
            </div>
            <div className="img">
              <img src={about_7} alt="" />
            </div>
            <div className="text">
              <p>
                بالاضافة إلى متابعة الاجراءات القانونية للعملاء للتوفير في الوقت
                والجهد على المستمثرين كما يتم الاستعانة بفريق عمل ميداني لدراسة
                الاسواق لبيان الفرص الحقيقة للمستثمر وكيفية اداراتها.
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent delay={0.2} threshold={0.1} duration={2}>
          <div className="card">
            <div className="top">
              <span>تسعير</span>
              <p>الخدمة</p>
            </div>
            <div className="img">
              <img src={about_8} alt="" />
            </div>
            <div className="text">
              <p>
                وكل ذلك من خلال السياسة المتبعة لشركة شارِك للإستشارات في توفير
                اسعار مناسبة بالاضافة إلى جودة الخدمات المقدمة طبقا لما يحتاجه
                كل عميل وطبقا لمتطلبات الجهات التي توجه اليها هذه الخدمات.
              </p>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </motion.div>
  );
}
