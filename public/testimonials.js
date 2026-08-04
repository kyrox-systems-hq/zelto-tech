const installTestimonials = () => {
  const proofStrip = document.querySelector('.proof-strip');
  if (!proofStrip || proofStrip.dataset.testimonialsReady === 'true') return;

  const visibleClass = proofStrip.classList.contains('visible') ? ' visible' : '';
  proofStrip.className = `testimonial-proof reveal${visibleClass}`;
  proofStrip.dataset.testimonialsReady = 'true';
  proofStrip.setAttribute('aria-labelledby', 'testimonial-proof-title');
  proofStrip.innerHTML = `
    <div class="testimonial-proof-heading">
      <p>Professional recommendations</p>
      <h3 id="testimonial-proof-title">What people who have worked with Suhayb say.</h3>
      <span>Real LinkedIn recommendations. Initials are used instead of enlarging low-resolution profile photos.</span>
    </div>
    <div class="testimonial-proof-grid">
      <article class="testimonial-proof-card is-featured">
        <div class="testimonial-person">
          <span class="testimonial-initials" aria-hidden="true">MN</span>
          <div><strong>Musa N.</strong><small>LinkedIn recommendation</small></div>
        </div>
        <blockquote>“Suhayb is always interested in generating the best quality work. His analytical mindset helped our campaigns and decisions directly, and he quickly progressed to managing the email marketing team.”</blockquote>
        <details>
          <summary>Read full recommendation</summary>
          <p>Suhayb is always someone who is interested in generating the best quality work for any given project or assignment. He is extremely coachable and adaptive, his analytical mindset and skills helped our campaigns and decisions directly. He is always focused on end result and presentation. In a very short span of time he was able to climb up the ladder and manage the entire email marketing team in our marketing division. I would highly recommend Suhayb to companies that are looking for candidates who are self starters and self motivated to produce the best results.</p>
        </details>
      </article>
      <article class="testimonial-proof-card">
        <div class="testimonial-person">
          <span class="testimonial-initials" aria-hidden="true">VA</span>
          <div><strong>Veronika Atayi</strong><small>LinkedIn recommendation</small></div>
        </div>
        <blockquote>“Suhayb was an excellent colleague who I managed directly. He was a good team player, communicated well and contributed ideas that improved workplace processes.”</blockquote>
        <details>
          <summary>Read full recommendation</summary>
          <p>Suhayb was an excellent colleague who I managed directly. He is a good team player, he had excellent communication skills, and he delivered quality customer service throughout his time at Subway. He also demonstrated innovation and contributed to improving certain processes in the workplace.</p>
        </details>
      </article>
    </div>`;
};

installTestimonials();
