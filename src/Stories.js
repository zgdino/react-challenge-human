import React from 'react'
import { useGlobalContext } from './context'
import moment from 'moment'

const Stories = () => {
  const { isLoading, stories, ARTICLE_LINK, IMAGE_LINK, removeStory } =
    useGlobalContext()

  if (isLoading) {
    return <div className='loading'></div>
  }
  return (
    <section className='stories'>
      {stories.map((story) => {
        const {
          title,
          date,
          slug,
          post_thumbnail,
          post_image,
          post_category_id,
          excerpt,
        } = story
        // console.log(story)
        return (
          <article className='story' key={date}>
            <div>
              <img
                className='story-img'
                src={`${IMAGE_LINK}${post_image}`}
                width='400'
                height='267'
                alt=''
              />
            </div>
            <div className='story-txt'>
              <button className='remove-btn' onClick={() => removeStory(date)}>
                DELETE
              </button>
              <h4 className='title'>{title}</h4>
              {/* it will show user's local date format → Croatia !== USA */}
              <p className='info'>{moment(date).format('L')}</p>
              {/* remove html tags from excerpt (json response) */}
              <p dangerouslySetInnerHTML={{ __html: excerpt }} />
              <div>
                <a
                  href={`${ARTICLE_LINK}${slug}`}
                  target='_blank'
                  className='read-link'
                  rel='noopener noreferrer'
                >
                  Full article
                </a>
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default Stories
