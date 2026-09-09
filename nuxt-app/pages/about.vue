<template>
  <main class="about-page">
    <section class="hero">
      <div class="hero__content">
        <p class="eyebrow">About our company</p>
        <h1>We build modern products that people genuinely enjoy using.</h1>
        <p class="description">
          We are a small product studio focused on creating simple, useful digital experiences.
          Our team blends design thinking, engineering, and customer empathy to turn ideas into products that feel effortless.
        </p>
        <div class="actions">
          <button class="primary">Get in touch</button>
          <button class="secondary">View projects</button>
        </div>
      </div>

      <div class="hero__card">
        <div class="card-badge">Since 2021</div>
        <h2>10k+</h2>
        <p>happy users across web and mobile experiences.</p>
        <ul>
          <li>Design systems</li>
          <li>Product strategy</li>
          <li>Frontend development</li>
        </ul>
      </div>
    </section>

    <section class="stats">
      <div class="stat">
        <strong>48</strong>
        <span>team members</span>
      </div>
      <div class="stat">
        <strong>120+</strong>
        <span>projects shipped</span>
      </div>
      <div class="stat">
        <strong>96%</strong>
        <span>customer retention</span>
      </div>
      <div class="stat">
        <strong>3x</strong>
        <span>faster delivery</span>
      </div>
    </section>

    <section class="values">
      <div class="section-heading">
        <p class="eyebrow">Why us</p>
        <h3>Built around clarity, craft, and trust.</h3>
      </div>

      <div class="value-grid">
        <article class="value-card">
          <span class="icon">✦</span>
          <h4>Clear strategy</h4>
          <p>We define the right goals early, focus on the essentials, and build with purpose.</p>
        </article>
        <article class="value-card">
          <span class="icon">◎</span>
          <h4>Thoughtful design</h4>
          <p>Every screen is shaped to feel intuitive, polished, and easy to understand.</p>
        </article>
        <article class="value-card">
          <span class="icon">✓</span>
          <h4>Reliable delivery</h4>
          <p>We keep projects moving with transparent communication and consistent execution.</p>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f7f8fc 0%, #eef2ff 100%);
  color: #111827;
  padding: 64px 24px 80px;
  font-family: Arial, Helvetica, sans-serif;
}

.hero {
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  align-items: center;
}

.hero__content {
  max-width: 640px;
}

.eyebrow {
  margin: 0 0 16px;
  color: #4f46e5;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 12px;
  font-weight: 700;
}

.hero h1 {
  margin: 0;
  font-size: clamp(2.6rem, 5vw, 4.4rem);
  line-height: 1.05;
  letter-spacing: -0.06em;
}

.description {
  margin-top: 20px;
  font-size: 1.08rem;
  line-height: 1.8;
  color: #4b5563;
}

.actions {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

button {
  border: none;
  border-radius: 999px;
  padding: 14px 24px;
  font-size: 0.96rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

.primary {
  background: #111827;
  color: #ffffff;
  box-shadow: 0 14px 30px rgba(17, 24, 39, 0.15);
}

.secondary {
  background: rgba(79, 70, 229, 0.08);
  color: #312e81;
}

.hero__card {
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 28px;
  padding: 28px 24px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
}

.card-badge {
  display: inline-block;
  background: #eef2ff;
  color: #4338ca;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 999px;
  padding: 8px 12px;
  margin-bottom: 18px;
}

.hero__card h2 {
  margin: 0;
  font-size: 3rem;
  letter-spacing: -0.06em;
}

.hero__card p {
  margin-top: 8px;
  color: #4b5563;
  line-height: 1.7;
}

.hero__card ul {
  list-style: none;
  padding: 0;
  margin: 20px 0 0;
  display: grid;
  gap: 12px;
}

.hero__card li {
  position: relative;
  padding-left: 24px;
  color: #1f2937;
  font-weight: 600;
}

.hero__card li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4f46e5;
  font-size: 1.4rem;
  line-height: 1;
}

.stats {
  max-width: 1180px;
  margin: 56px auto 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 20px;
}

.stat {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 20px;
  padding: 24px 18px;
  text-align: center;
}

.stat strong {
  display: block;
  font-size: 2rem;
  letter-spacing: -0.05em;
  color: #111827;
}

.stat span {
  display: block;
  margin-top: 8px;
  font-size: 0.94rem;
  color: #4b5563;
}

.values {
  max-width: 1180px;
  margin: 72px auto 0;
}

.section-heading {
  margin-bottom: 24px;
}

.section-heading h3 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 2.8rem);
  letter-spacing: -0.06em;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 22px;
}

.value-card {
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 22px;
  padding: 28px 22px;
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.05);
}

.icon {
  display: inline-flex;
  width: 46px;
  height: 46px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #eef2ff;
  color: #4f46e5;
  font-size: 1.2rem;
  font-weight: 700;
}

.value-card h4 {
  margin: 18px 0 8px;
  font-size: 1.3rem;
}

.value-card p {
  margin: 0;
  color: #4b5563;
  line-height: 1.7;
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .stats,
  .value-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 560px) {
  .about-page {
    padding-top: 40px;
  }

  .stats,
  .value-grid {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column;
    align-items: stretch;
  }

  button {
    width: 100%;
  }
}
</style>