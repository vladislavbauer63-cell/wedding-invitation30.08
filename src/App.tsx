import { motion, type Variants } from 'framer-motion'
import { useEffect, useMemo, useState, type ReactNode, type FormEvent } from 'react'
import './App.css'

type TimelineItem = {
  time: string
  title: string
  text: string
}

type CountdownParts = {
  days: string
  hours: string
  minutes: string
  seconds: string
}

const timeline: TimelineItem[] = [
  {
    time: '15:00',
    title: 'СБОР ГОСТЕЙ',
    text: 'Встречаемся, настраиваемся на прекрасный вечер и готовимся к празднику.',
  },
  {
    time: '16:00',
    title: 'ЦЕРЕМОНИЯ',
    text: 'Самый трогательный момент нашего дня.',
  },
  {
    time: '17:00',
    title: 'БАНКЕТ',
    text: 'Самое время для вкусной еды, развлечений и поздравлений.',
  },
]

const palette = ['#efb0a8', '#7b7b38', '#decab0', '#bbc8aa', '#aaa59b', '#72462e']
const weddingDate = new Date('2026-08-30T15:00:00')

const venueImage =
  'https://img.arendazala.net/pcpYKZHNBtIq5_xLFkVQl6NKqQXY400iIvGYAFQzqnyMofofuAAkipENeSt6t4gSbcJVW2858lcp22HtYCqqXNQzcjNZx9R6TEg3Zw=w560-h332-n-l95-rw'

const heroImage = `${import.meta.env.BASE_URL}hero.jpg`
const countdownImage = `${import.meta.env.BASE_URL}countdown.jpg`
const dressCodeImage = `${import.meta.env.BASE_URL}dresscode.jpg`
const chatImage1 = `${import.meta.env.BASE_URL}chat1.jpg`
const chatImage2 = `${import.meta.env.BASE_URL}chat2.jpg`

const mapUrl =
  'https://2gis.ru/irkutsk/search/%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0%20%D1%85%D0%BE%D0%BB%D0%BB/firm/70000001100068753/104.325811%2C52.22267?m=104.280722%2C52.28858%2F10.86'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const formUrl =
  'https://script.google.com/macros/s/AKfycbyEPPD5-aWy0-G8IbGBIdFdF0D7IvjRvC60wFXwdwZ1qqtXe2xmZTSgz7p1NFI-XsH_Kg/exec'

const softReveal: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: 'easeOut',
    },
  },
}

function formatUnit(value: number): string {
  return String(Math.max(0, value)).padStart(2, '0')
}

function getCountdown(targetDate: Date): CountdownParts {
  const diff = targetDate.getTime() - Date.now()

  if (diff <= 0) {
    return { days: '0', hours: '0', minutes: '0', seconds: '0' }
  }

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {
    days: String(days),
    hours: formatUnit(hours),
    minutes: formatUnit(minutes),
    seconds: formatUnit(seconds),
  }
}

function AnimatedSection({
  children,
  className = '',
  delay = 0,
  amount = 0.25,
  variant = 'fade',
}: {
  children: ReactNode
  className?: string
  delay?: number
  amount?: number
  variant?: 'fade' | 'soft'
}) {
  const variants = variant === 'soft' ? softReveal : fadeUp

  return (
    <motion.section
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="section-title comforter-title">{children}</h2>
}

function TimelinePill({ item, delay = 0 }: { item: TimelineItem; delay?: number }) {
  return (
    <motion.div
      className="timeline-pill"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
      transition={{ delay }}
    >
      <div className="timeline-time">{item.time}</div>
      <div className="timeline-content">
        <div className="timeline-title">{item.title}</div>
        {item.text ? <div className="timeline-text">{item.text}</div> : null}
      </div>
    </motion.div>
  )
}

function DetailCard({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      className="detail-card"
      variants={softReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

function CountdownCard({ countdown }: { countdown: CountdownParts }) {
  const countdownItems: Array<[string, string]> = [
    [countdown.days, 'дней'],
    [countdown.hours, 'часов'],
    [countdown.minutes, 'минут'],
    [countdown.seconds, 'секунд'],
  ]

  return (
    <div className="countdown-card">
      <img src={countdownImage} alt="Фото пары" className="countdown-photo-image" />
      <div className="countdown-darken" />
      <div className="countdown-overlay">
        <div className="countdown-heading">До свадьбы осталось...</div>
        <div className="countdown-grid">
          {countdownItems.map(([num, label], index) => (
            <motion.div
              key={label}
              className="countdown-circle"
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: 0.08 * index, ease: 'easeOut' }}
            >
              <div className="countdown-number">{num}</div>
              <div className="countdown-label">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [countdown, setCountdown] = useState<CountdownParts>(() => getCountdown(weddingDate))
  const [guestName, setGuestName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attendance, setAttendance] = useState('')
  const [withChildren, setWithChildren] = useState('')
  const [childrenCount, setChildrenCount] = useState('')
  const [food, setFood] = useState<string[]>([])
  const [drinks, setDrinks] = useState<string[]>([])
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  function toggleDrink(drink: string) {
    setDrinks((prev) =>
      prev.includes(drink) ? prev.filter((item) => item !== drink) : [...prev, drink]
    )
  }

  function toggleFood(foodItem: string) {
    setFood((prev) =>
      prev.includes(foodItem) ? prev.filter((item) => item !== foodItem) : [...prev, foodItem]
    )
  }

  async function handleQuestionnaireSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!guestName.trim()) {
      setSubmitMessage('Пожалуйста, укажите имя и фамилию.')
      return
    }

    if (!attendance) {
      setSubmitMessage('Пожалуйста, выберите, сможете ли Вы присутствовать.')
      return
    }

    if (withChildren === 'Да' && !childrenCount.trim()) {
      setSubmitMessage('Пожалуйста, укажите количество детей.')
      return
    }

    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const formData = new FormData()
      formData.append('name', guestName.trim())
      formData.append('attendance', attendance)
      formData.append('withChildren', withChildren)
      formData.append('childrenCount', withChildren === 'Да' ? childrenCount.trim() : '')
      formData.append('food', food.join(', '))
      formData.append('drinks', drinks.join(', '))
      formData.append('comment', comment.trim())

      await fetch(formUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      })

      setSubmitMessage('')
      setIsSubmitted(true)
      setGuestName('')
      setAttendance('')
      setWithChildren('')
      setChildrenCount('')
      setFood([])
      setDrinks([])
      setComment('')
    } catch (error) {
      setSubmitMessage('Не удалось отправить анкету. Попробуйте ещё раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown(weddingDate))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const heroImageSrc = useMemo(() => heroImage, [])

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <main className="container">
        <AnimatedSection className="hero-section" variant="soft">
          <motion.div
            className="hero-invite"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: 'easeOut' }}
          >
            Приглашение на свадьбу
          </motion.div>

          <motion.div
            className="hero-photo-wrap"
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.12, ease: 'easeOut' }}
          >
            <motion.div
              className="hero-photo-shadow"
              initial={{ opacity: 0, x: 12, y: -6 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
            />
            <div className="hero-photo-frame">
              <img src={heroImageSrc} alt="Людмила и Владислав" className="hero-photo" />
            </div>
          </motion.div>

          <motion.div
            className="hero-names comforter-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.28, ease: 'easeOut' }}
          >
            Людмила и Владислав
          </motion.div>

          <motion.div
            className="hero-date"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.4, ease: 'easeOut' }}
          >
            <div className="hero-date-side">
              <div className="hero-date-line" />
              <div className="hero-date-text lower">август</div>
              <div className="hero-date-line" />
            </div>

            <div className="hero-date-number">30</div>

            <div className="hero-date-side">
              <div className="hero-date-line" />
              <div className="hero-date-text">2026</div>
              <div className="hero-date-line" />
            </div>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="center-section" delay={0.05}>
          <div className="big-heading comforter-title">
            Дорогие
            <br />
            родные и друзья!
          </div>
          <p className="body-text intro-text">
            Мы очень хотим сделать этот день особенным, поэтому приглашаем Вас разделить с нами
            торжество, посвященное дню нашей свадьбы!
          </p>
        </AnimatedSection>

        <AnimatedSection className="location-section" variant="soft">
          <div className="location-card">
            <SectionTitle>
              Место проведения
              <br />
              торжества
            </SectionTitle>

            <div className="location-label">ЖДЕМ ВАС ПО АДРЕСУ:</div>

            <div className="location-address">
              г. Иркутск
              <br />
              ул. Якоби, 35
              <br />
              «ПАНОРАМА ХОЛЛ»
            </div>

            <motion.div
              className="location-image-wrap"
              initial={{ opacity: 0, scale: 0.985, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.85, delay: 0.1, ease: 'easeOut' }}
            >
              <div className="location-image-frame">
                <img src={venueImage} alt="Панорама холл" className="location-image" />
              </div>

              <div className="map-button-wrap">
                <motion.a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  ПОСМОТРЕТЬ
                  <br />
                  НА КАРТЕ
                </motion.a>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="center-section">
          <SectionTitle>Программа дня</SectionTitle>
          <div className="timeline-list">
            {timeline.map((item, index) => (
              <TimelinePill key={`${item.time}-${item.title}`} item={item} delay={index * 0.08} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="center-section">
          <SectionTitle>Дресс-код</SectionTitle>
          <p className="body-text dress-text">
            Мы очень старались сделать праздник красивым и будем рады, если в своих нарядах Вы
            поддержите цветовую гамму нашей свадьбы!
          </p>

          <div className="palette-row">
            {palette.map((color, index) => (
              <motion.div
                key={color}
                className="palette-circle"
                style={{ backgroundColor: color }}
                initial={{ opacity: 0, y: 10, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
              />
            ))}
          </div>

          <motion.div
            className="dress-single-wrap"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <img src={dressCodeImage} alt="Дресс-код" className="dress-single-photo" />
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="center-section questionnaire-section" variant="soft">
          <motion.div
            className="questionnaire-card"
            layout
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <div className="questionnaire-heart questionnaire-heart-left">♡</div>
            <div className="questionnaire-heart questionnaire-heart-right">♡</div>

            <div className="questionnaire-title comforter-title">Анкета</div>

            {!isSubmitted && (
              <p className="questionnaire-subtitle">Пожалуйста, подтвердите свое присутствие</p>
            )}

            {isSubmitted ? (
              <motion.div
                className="questionnaire-message questionnaire-message-success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                Спасибо! Ваш ответ сохранён.
              </motion.div>
            ) : (
              <form className="questionnaire-form" onSubmit={handleQuestionnaireSubmit}>
                <div className="questionnaire-field">
                  <label className="questionnaire-label">Ваше Имя и Фамилия</label>
                  <input
                    type="text"
                    className="questionnaire-input"
                    placeholder="ФИО"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </div>

                <div className="questionnaire-field">
                  <div className="questionnaire-label">Вы сможете присутствовать?</div>
                  <div className="questionnaire-options">
                    <label className="questionnaire-option">
                      <input
                        type="radio"
                        name="attendance"
                        checked={attendance === 'Да'}
                        onChange={() => setAttendance('Да')}
                      />
                      <span>Да</span>
                    </label>
                    <label className="questionnaire-option">
                      <input
                        type="radio"
                        name="attendance"
                        checked={attendance === 'К сожалению, нет'}
                        onChange={() => setAttendance('К сожалению, нет')}
                      />
                      <span>К сожалению, нет</span>
                    </label>
                  </div>
                </div>

                <div className="questionnaire-field">
                  <div className="questionnaire-label">Планируете ли Вы быть с детьми?</div>
                  <div className="questionnaire-options">
                    <label className="questionnaire-option">
                      <input
                        type="radio"
                        name="withChildren"
                        checked={withChildren === 'Да'}
                        onChange={() => setWithChildren('Да')}
                      />
                      <span>Да</span>
                    </label>
                    <label className="questionnaire-option">
                      <input
                        type="radio"
                        name="withChildren"
                        checked={withChildren === 'Нет'}
                        onChange={() => {
                          setWithChildren('Нет')
                          setChildrenCount('')
                        }}
                      />
                      <span>Нет</span>
                    </label>
                  </div>
                </div>

                {withChildren === 'Да' && (
                  <div className="questionnaire-field">
                    <label className="questionnaire-label">Сколько детей будет с Вами?</label>
                    <input
                      type="number"
                      min="1"
                      className="questionnaire-input"
                      placeholder="Например: 2"
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(e.target.value)}
                    />
                  </div>
                )}

                <div className="questionnaire-field">
                  <div className="questionnaire-label">
                    Какое горячее Вы предпочитаете? Можно выбрать несколько вариантов
                  </div>
                  <div className="questionnaire-options">
                    <label className="questionnaire-option">
                      <input
                        type="checkbox"
                        checked={food.includes('Мясо')}
                        onChange={() => toggleFood('Мясо')}
                      />
                      <span>Мясо</span>
                    </label>
                    <label className="questionnaire-option">
                      <input
                        type="checkbox"
                        checked={food.includes('Рыба')}
                        onChange={() => toggleFood('Рыба')}
                      />
                      <span>Рыба</span>
                    </label>
                    <label className="questionnaire-option">
                      <input
                        type="checkbox"
                        checked={food.includes('Курица')}
                        onChange={() => toggleFood('Курица')}
                      />
                      <span>Курица</span>
                    </label>
                  </div>
                </div>

                <div className="questionnaire-field">
                  <div className="questionnaire-label">
                    Уточните Ваши предпочтения в напитках, выбрав один или несколько вариантов:
                  </div>
                  <div className="questionnaire-options">
                    <label className="questionnaire-option">
                      <input
                        type="checkbox"
                        checked={drinks.includes('Шампанское')}
                        onChange={() => toggleDrink('Шампанское')}
                      />
                      <span>Шампанское</span>
                    </label>
                    <label className="questionnaire-option">
                      <input
                        type="checkbox"
                        checked={drinks.includes('Водка')}
                        onChange={() => toggleDrink('Водка')}
                      />
                      <span>Водка</span>
                    </label>
                    <label className="questionnaire-option">
                      <input
                        type="checkbox"
                        checked={drinks.includes('Красное вино')}
                        onChange={() => toggleDrink('Красное вино')}
                      />
                      <span>Красное вино</span>
                    </label>
                    <label className="questionnaire-option">
                      <input
                        type="checkbox"
                        checked={drinks.includes('Белое вино')}
                        onChange={() => toggleDrink('Белое вино')}
                      />
                      <span>Белое вино</span>
                    </label>
                    <label className="questionnaire-option">
                      <input
                        type="checkbox"
                        checked={drinks.includes('Виски')}
                        onChange={() => toggleDrink('Виски')}
                      />
                      <span>Виски</span>
                    </label>
                    <label className="questionnaire-option">
                      <input
                        type="checkbox"
                        checked={drinks.includes('Безалкогольные напитки')}
                        onChange={() => toggleDrink('Безалкогольные напитки')}
                      />
                      <span>Безалкогольные напитки</span>
                    </label>
                  </div>
                </div>

                <div className="questionnaire-field">
                  <label className="questionnaire-label">Комментарий или пожелания</label>
                  <textarea
                    className="questionnaire-textarea"
                    placeholder="Например: не употребляю алкоголь, есть аллергия, нужен детский стул и т.д."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div className="questionnaire-submit-wrap">
                  <button type="submit" className="questionnaire-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ'}
                  </button>
                </div>

                {submitMessage && !isSubmitted ? (
                  <div className="questionnaire-message">{submitMessage}</div>
                ) : null}
              </form>
            )}
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="center-section" variant="soft">
          <CountdownCard countdown={countdown} />
        </AnimatedSection>

        <AnimatedSection className="center-section">
          <SectionTitle>Детали</SectionTitle>
          <div className="details-list">
            <DetailCard delay={0.02}>
              Свои тёплые слова и пожелания приносите в сердцах, а подарки – в конверте.
            </DetailCard>

            <DetailCard delay={0.1}>
              Приятным комплиментом для нас будет, если вместо цветов Вы подарите бутылочку
              алкогольного напитка для пополнения нашей семейной коллекции.
            </DetailCard>
          </div>
        </AnimatedSection>

        <AnimatedSection className="center-section" variant="soft">
          <SectionTitle>Чат для гостей</SectionTitle>

          <div className="chat-text body-text">
            <p>
              Для Вашего удобства мы создали чат в Telegram, куда можно будет добавлять фото и
              видео со свадьбы.
            </p>
            <p>
              Давайте поделимся друг с другом счастливыми моментами этого важного дня и будем на
              связи!
            </p>
          </div>

          <div className="chat-images">
            <motion.div
              className="chat-image-left"
              initial={{ opacity: 0, x: -16, y: 16, rotate: -2 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <img src={chatImage1} alt="Фото пары 1" className="chat-photo" />
            </motion.div>

            <motion.div
              className="chat-image-right"
              initial={{ opacity: 0, x: 16, y: 20, rotate: 2 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, delay: 0.08, ease: 'easeOut' }}
            >
              <img src={chatImage2} alt="Фото пары 2" className="chat-photo" />
            </motion.div>
          </div>

          <motion.a
            href="https://t.me/+KhFOvuBvafc4YmE6"
            target="_blank"
            rel="noopener noreferrer"
            className="chat-button"
            whileHover={{ y: -2, scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.25 }}
          >
            ВСТУПИТЬ В ЧАТ
          </motion.a>
        </AnimatedSection>

        <AnimatedSection className="center-section contacts-section" variant="soft">
          <SectionTitle>Контакты</SectionTitle>

          <div className="contacts-card-wrap">
            <DetailCard delay={0.03}>
              По всем вопросам, просим обращаться к нашему организатору:
              <br />
              Екатерина +79501400699
            </DetailCard>
          </div>

          <motion.div
            className="closing-text"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, delay: 0.08, ease: 'easeOut' }}
          >
            <span className="closing-prefix">С любовью,</span>
            <span className="closing-names comforter-title">Людмила и Владислав</span>
          </motion.div>

          <motion.div
            className="closing-date"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.75, delay: 0.16, ease: 'easeOut' }}
          >
            30.08.2026
          </motion.div>
        </AnimatedSection>
      </main>
    </motion.div>
  )
}