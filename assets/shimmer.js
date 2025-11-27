
// small shimmer on CTA and beams
document.addEventListener('DOMContentLoaded', ()=>{
  const cta = document.querySelector('.cta');
  if(cta){
    cta.addEventListener('mouseenter', ()=> cta.style.boxShadow='0 30px 90px rgba(7,89,133,0.28)');
    cta.addEventListener('mouseleave', ()=> cta.style.boxShadow='0 8px 30px rgba(7,89,133,0.12)');
  }
});
