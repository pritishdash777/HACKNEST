
(function(){
  "use strict";

  // year
  var y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // navbar scroll state
  var navbar = document.getElementById('navbar');
  var backToTop = document.getElementById('backToTop');
  function onScroll(){
    var s = window.scrollY > 20;
    navbar.classList.toggle('scrolled', s);
    backToTop.classList.toggle('show', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  backToTop.addEventListener('click', function(){ window.scrollTo({top:0,behavior:'smooth'}); });

  // mobile menu
  var burger = document.getElementById('hamburgerBtn');
  var menu = document.getElementById('mobileMenu');
  function closeMenu(){ menu.classList.remove('open'); burger.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }
  burger.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });

  // toast
  var toast = document.getElementById('toast');
  var toastMsg = toast.querySelector('.toast-message');
  var toastTimer;
  function showToast(msg){
    toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toast.classList.remove('show'); }, 3200);
  }
  document.addEventListener('click', function(e){
    var el = e.target.closest('[data-toast]');
    if(el){ e.preventDefault(); showToast(el.getAttribute('data-toast')); }
  });

  // modal
  var modal = document.getElementById('createProjectModal');
  function openModal(){ modal.classList.add('open'); document.body.style.overflow='hidden'; }
  function closeModal(){ modal.classList.remove('open'); document.body.style.overflow=''; }
  document.querySelectorAll('[data-open-modal]').forEach(function(b){ b.addEventListener('click', openModal); });
  document.querySelectorAll('[data-close-modal]').forEach(function(b){ b.addEventListener('click', closeModal); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeModal(); });
  var projForm = document.getElementById('createProjectForm');
  if(projForm) projForm.addEventListener('submit', function(e){ e.preventDefault(); closeModal(); showToast('Thanks! Project posting opens when SkillSync launches.'); projForm.reset(); });

  // forms
  ['waitlistForm','newsletterForm'].forEach(function(id){
    var f = document.getElementById(id);
    if(f) f.addEventListener('submit', function(e){ e.preventDefault(); showToast("You're on the list — we'll be in touch soon."); f.reset(); });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.faq-item');
      var ans = item.querySelector('.faq-answer');
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : '0';
    });
  });

  // reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
})();
