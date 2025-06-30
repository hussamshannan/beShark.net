import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
//improt images
import paperwork from "../../assets/images/paperwork.jpg";
import about_1 from "../../assets/images/about1.webp";
import about_2 from "../../assets/images/about2.webp";
import about_3 from "../../assets/images/about3.webp";
import about_4 from "../../assets/images/about4.jpg";
import about_5 from "../../assets/images/about5.webp";
import about_6 from "../../assets/images/about6.webp";
import about_7 from "../../assets/images/about7.webp";
import about_8 from "../../assets/images/about8.webp";
import "../../assets/style/common/feasibility-studies.css";
import AnimatedContent from "../../components/AnimatedContent";
import { motion } from "framer-motion";
export default function Medical_sector() {
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
          <h1>دراسات جدوى القطاع الطبي</h1>
        </AnimatedContent>
        <img src={paperwork} alt="" />
      </div>
      <div className="slides">
        <div className="slide">
          <div className="img">
            <img src={about_1} alt="" />
          </div>
          <div className="text">
            <h3>دراسات جدوى القطاع الطبي</h3>
            <p>
              *يتم إعداد دراسة جدوى متكاملة للمطعم أو الكافيه **وتشمل بيان
              تكاليف المشروع التفصيلية *حجم الأرباح اليومية والشهرية الارباح
              السنوية لمدة عشر سنوات في ضوء الدراسة السوقية للمشروع وفي اطار :
              موقع المشروع والمساحة الخاصة به و في ضوء النظام الذي يعمل به
              المطعم الفئة المستهدفة كذلك بيان الموظفين والرواتب ،، وقائمة
              الأسعار ، والوجبات ، والمشروبات المقدمة.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
