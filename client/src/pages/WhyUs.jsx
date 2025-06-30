import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
//improt images
import paperwork from "../assets/images/paperwork.jpg";
import img1 from "../assets/images/past_work.webp";
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
export default function WhyUs() {
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
          <h1>لماذا شارِك للإستشارات؟</h1>
        </AnimatedContent>
        <img src={paperwork} alt="" />
      </div>
      <div className="cards">
        <h2>خبرتنا تمتد لـ اكثر من 13 عام في السوق الخليجي</h2>
        <AnimatedContent delay={0.2} threshold={0.1} duration={2}>
          <div className="card">
            <div className="top">
              <span>خبرات</span>
              <p>متخصصة</p>
            </div>
            <div className="title">
              <h2>سابقة الأعمال </h2>
            </div>
            <div className="img">
              <img src={img1} alt="" />
            </div>
            <div className="text">
              <p>
                خبرات فريق العمل المتنوعة في كافة القطاعات التي يتاح الاستثمار
                فيها وذلك في كافة الاقسام سواء كانت إدارية أو مالية أو سوقية أو
                فنية أو غيرها.
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent delay={0.2} threshold={0.1} duration={2}>
          <div className="card">
            <div className="top">
              <span>سرعة</span>
              <p>التنفيذ</p>
            </div>
            <div className="title">
              <h2>الوقت</h2>
            </div>
            <div className="img">
              <img src={about_4} alt="" />
            </div>
            <div className="text">
              <p>انجاز الخدمات المطلوبة في وقت قياسي</p>
            </div>
          </div>
        </AnimatedContent>

        <AnimatedContent delay={0.2} threshold={0.1} duration={2}>
          <div className="card">
            <div className="top">
              <span>ضمان</span>
              <p>السرية</p>
            </div>
            <div className="title">
              <h2>السرية</h2>
            </div>
            <div className="img">
              <img src={about_5} alt="" />
            </div>
            <div className="text">
              <p>
                التعهد بالحفاظ على سرية العميل والمشروعات التي يقوم بتأسيسها أو
                تطويرها، أو أي منتجات أو خدمات يرغب بتقديمها في الخليج.
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent delay={0.2} threshold={0.1} duration={2}>
          <div className="card">
            <div className="top">
              <span>فريق</span>
              <p>خبير</p>
            </div>
            <div className="title">
              <h2>خبرات فريق العمل</h2>
            </div>
            <div className="img">
              <img src={about_6} alt="" />
            </div>
            <div className="text">
              <p>
                فريق عمل لديه خبرات لا تقل عن 10 سنوات قام بتنفيذ واتمام دراسات
                جدوى و إستشارات إدارية متنوعة في كافة القطاعات
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent delay={0.2} threshold={0.1} duration={2}>
          <div className="card">
            <div className="top">
              <span>دعم</span>
              <p>مستمر </p>
            </div>
            <div className="title">
              <h2>خدمة ما بعد البيع</h2>
            </div>
            <div className="img">
              <img src={about_2} alt="" />
            </div>
            <div className="text">
              <p>
                حيث يتم تقديم الخدمات إلى العميل بمختلف انواعها بالاضافة إلى
                متابعة سير الاجراءات.
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent delay={0.2} threshold={0.1} duration={2}>
          <div className="card">
            <div className="top">
              <span>متابعة</span>
              <p>فعّالة</p>
            </div>
            <div className="title">
              <h2>المتابعة المستمرة مع العملاء</h2>
            </div>
            <div className="img">
              <img src={about_3} alt="" />
            </div>
            <div className="text">
              <p>
                يتم المتابعة مع العميل من خلال ارسال رقم الطلب للخدمة ومناقشته
                في أي خدمات يريد اضافتها للمشروع
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent delay={0.2} threshold={0.1} duration={2}>
          <div className="card">
            <div className="top">
              <span>خدمات</span>
              <p>تنفيذية</p>
            </div>
            <div className="title">
              <h2>خدمات المشروعات تحت التنفيذ</h2>
            </div>
            <div className="img">
              <img src={about_7} alt="" />
            </div>
            <div className="text">
              <p>
                يتم تقديم خدمات الإستشارات للمشروعات تحت الانشاء سواء خدمات تخص
                الموردين أو العملاء ومنها الالات والمعدات أو الاجهزة أو غيرها من
                كافة دول العالم
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent delay={0.2} threshold={0.1} duration={2}>
          <div className="card">
            <div className="top">
              <span>تطوير</span>
              <p>دائم</p>
            </div>
            <div className="title">
              <h2>التطوير المستمر</h2>
            </div>
            <div className="img">
              <img src={about_8} alt="" />
            </div>
            <div className="text">
              <p>
                ان كل عام يمر على شارِك للإستشارات يتم تطوير قائمة الخدمات
                بالشركة بالاضافة إلى التوسع الكبير في قاعدة العملاء يجبرنا على
                تقديم خدماتنا للعملاء بافضل جودة
              </p>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </motion.div>
  );
}
