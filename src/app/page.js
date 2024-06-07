'use client'
import { useState, useEffect, useRef } from 'react'
// import "bootstrap";
import dynamic from 'next/dynamic'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Head from 'next/head'
import ContentLoader from 'react-content-loader'
import UserList from '@/components/Header'
import InfiniteScroll from '../../InfiniteScroll'
import { fetchItems } from '@/services/itemService'
import LoadingSpinner from '@/components/LoadingSpinner' // Import the LoadingSpinner component
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import Modal from 'react-modal'
import ReactHtmlParser from 'react-html-parser'
import Vimeo from '@u-wave/react-vimeo'

const Loading = dynamic(() => import('react-fullscreen-loading'), {
  ssr: false,
})

// import _ from "lodash";
import RGL, { WidthProvider } from 'react-grid-layout'
// import 'react-loading-skeleton/dist/skeleton.css'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'

export default function Home() {
  const [isActive, setIsActive] = useState(false)
  const [isActiveConModal, setIsActiveConModal] = useState(false)

  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [floading, setFLoading] = useState(false)

  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState(null)

  const [productionData, setProductionData] = useState([])
  const [productionSingleData, setProductionSingleData] = useState([])
  const [topics, setTopics] = useState([])

  const [courseMode, setCourseMode] = useState('production')
  const [filterCoursesLastPage, setFilterCoursesLastPage] = useState(false)
  const [loader, setLoader] = useState(false)
  const [loaderN, setLoaderN] = useState(false)

  const [issetFilter, setIssetFilter] = useState(false)

  const [currentPageFilter, setCurrentPageFilter] = useState(1)
  const [total, setTotal] = useState(1)
  const router = useRouter()

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  useEffect(() => {
    // if (router.isReady) {

    topic()
    listing()
    // }
  }, [])

  const layout = [
    { i: '1', x: 0, y: 0, w: 1, h: 1 },
    { i: '2', x: 1, y: 0, w: 1, h: 1 },
    { i: '3', x: 2, y: 0, w: 1, h: 1 },
    { i: '4', x: 3, y: 0, w: 1, h: 1 },
  ]

  const topic = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/topics`)
      // console.log('sds')
      console.log(data)
      const get_topics = data.data.get_topics
      setTopics(get_topics)
      console.log(get_topics)
    } catch (err) {
      console.log(err)
    }
  }

  const listing = async () => {
    try {
      setFLoading(true)

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/listing`)
      console.log(data)
      const get_feeds = data.data.get_feeds.data
      setProductionData(get_feeds)
      setTotal(data.data.get_feeds.total)
      setCurrentPageFilter(2)

      console.log(get_feeds)
      setFLoading(false)
    } catch (err) {
      console.log(err)
      setFLoading(false)
    }
  }

  const filtersLoadMoreData = async (data) => {
    setCurrentPageFilter(currentPageFilter + 1)
    setLoader(true)
    setLoading(true)

    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      }

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/listing?page=${currentPageFilter}`,
        {
          type: courseMode,
        },
        config,
      )

      console.log(data)

      if (data.data.get_feeds.current_page === data.data.get_feeds.last_page) {
        setHasMore(false)
      }

      const get_work = data.data.get_feeds.data
      const get_work_last_page = data.data.get_feeds.last_page

      const n_array = [...productionData, ...get_work]

      console.log(n_array)

      setProductionData(n_array)

      if (get_work_last_page == currentPageFilter) {
        setFilterCoursesLastPage(true)
      }

      setLoader(false)
      setLoading(false)

      console.log(data)
    } catch (err) {
      console.log(err)
      setLoader(false)
      setLoading(false)
    }
  }

  const handleClick = () => {
    setIsActive(!isActive)
  }

  const handleClickSearch = () => {
    setIsActiveConModal(!isActive)
  }

  // State to store image heights
  const [imageHeights, setImageHeights] = useState({})

  // Function to generate a random height for each grid item
  const generateRandomHeights = () => {
    const heights = {}
    layout.forEach((item, index) => {
      heights[index] = Math.floor(Math.random() * (300 - 100 + 1)) + 100 // Random height between 100 and 300
    })
    return heights
  }

  // State to store additional data for each grid item
  const [additionalData] = useState([
    { id: '1', title: 'Item 1', description: 'Description for Item 1' },
    { id: '2', title: 'Item 2', description: 'Description for Item 2' },
    { id: '3', title: 'Item 3', description: 'Description for Item 3' },
    { id: '4', title: 'Item 4', description: 'Description for Item 4' },
  ])

  // Fetch image dimensions and update state
  useEffect(() => {
    const heights = generateRandomHeights()
    setImageHeights(heights)
  }, []) // Run once on component mount

  let subtitle
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10,
      background: 'none',
      border: 'none',
    },
  }

  const SetNewObject = (listing) => {
    setProductionSingleData(listing)
  }

  const [checkedStatus, setCheckedStatus] = useState({})

  useEffect(() => {
    const initialCheckedStatus = topics.reduce((acc, item) => {
      acc[item.id] = false
      return acc
    }, {})
    setCheckedStatus(initialCheckedStatus)
  }, [topics])

  const handleCheckboxChange = (id) => {
    setCheckedStatus((prevCheckedStatus) => ({
      ...prevCheckedStatus,
      [id]: !prevCheckedStatus[id],
    }))
  }

  const isAnyChecked = () => {
    return Object.values(checkedStatus).some((status) => status)
  }

  const resetCheckboxes = () => {
    setLoading(true)
    setProductionData([])

    scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    const resetStatus = Object.keys(checkedStatus).reduce((acc, key) => {
      acc[key] = false
      return acc
    }, {})
    setCheckedStatus(resetStatus)

    listing()

    setLoading(false)
  }

  const getCheckedIds = async () => {
    setIsActive(!isActive)
    setFLoading(true)
    setLoading(true)

    scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    setProductionData([])

    const all_ids = Object.keys(checkedStatus).filter((id) => checkedStatus[id])

    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/filter-data`,
        {
          topic: all_ids,
        },
        config,
      )

      console.log(data)

      const get_feeds = data.data.get_feeds.data
      setProductionData(get_feeds)

      // setTotal(data.data.get_work.total)
      setFLoading(false)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setFLoading(false)
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)

    // Define an array of month abbreviations
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    // Get the day, month, and year from the Date object
    const day = date.getDate()
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()

    // Format the date as "MMM DD, YYYY"
    return `${month} ${day}, ${year}`
  }

  return (
    <>
      {floading && (
        <Loading
          loading
          background="rgba(220, 230, 240, 0.4)"
          loaderColor="#3498db"
        />
      )}

      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="crs-mdls">
                <button
                  onClick={closeModal}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="post-holder imagefrm-single">
                  <div className="main-pstimgs">
                    {productionSingleData.post_type == 'video' && (
                      <>
                        <Vimeo
                          video={productionSingleData.video}
                          frameborder="0"
                          title={productionSingleData.name}
                        />
                      </>
                    )}

                    {productionSingleData.post_type == 'text' && (
                      <>
                        <img
                          src={`https://res.cloudinary.com/dixxvh4rf/image/upload/q_auto/${productionSingleData.thumbnail.replace(
                            / /g,
                            '_',
                          )}`}
                          alt
                        />
                      </>
                    )}
                  </div>
                  <div class="post-dnconnts">
                  <div className="post-hndls">
                                      <a
                                        target="_blank"
                                        href={listing.external_link}
                                      >
                                        {listing.platform.split(',')[0] ==
                                          'FB' && (
                                          <>
                                            @{listing.platform.split(',')[1]}
                                            <img src="/images/faceigs.png" />
                                          </>
                                        )}

                                        {listing.platform.split(',')[0] ==
                                          'IG' && (
                                          <>
                                            @{listing.platform.split(',')[1]}
                                            <img src="/images/insta.png" />
                                          </>
                                        )}

                                        {listing.platform.split(',')[0] ==
                                          'YT' && (
                                          <>
                                            @{listing.platform.split(',')[1]}
                                            <img src="/images/youtube.png" />
                                          </>
                                        )}

                                        {listing.platform.split(',')[0] ==
                                          'X' && (
                                          <>
                                            @{listing.platform.split(',')[1]}
                                            <img src="/images/twitterx.png" />
                                          </>
                                        )}

                                        {listing.platform.split(',')[0] ==
                                          'others' && (
                                          <>{listing.platform.split(',')[1]}</>
                                        )}
                                      </a>
                                    </div>
                    <h3 className="post-tts">{productionSingleData.name}</h3>
                    <p class="dtpst">
                      {formatDate(productionSingleData.publish_date)}
                    </p>
                    <p className="subs-descs">
                      {ReactHtmlParser(productionSingleData.description)}
                    </p>
                  </div>
                  <a href='#' className='rdmrsd'>Read More</a> 
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      <div>
        <header className="site-header topmain mobexheight norm">
          <nav className="navbar navbar-expand-lg navbar-lg-light">
            <div className="container">
              <a className="navbar-brand" href="/">
                <img
                  src="./images/pulse-monitor-gray3.png?v=3"
                  className="navbar-brand-img"
                  alt="logo"
                />
              </a>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="mobile-widgets">
                  <div
                    className="cross"
                    data-toggle="collapse"
                    data-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded="true"
                    aria-label="Toggle navigation"
                  >
                    <i className="fal fa-times" />
                  </div>
                </div>
                <div className="mr-auto showinner" id="accordionExample">
                  <ul
                    className="navbar-nav ml-auto position-relative"
                    id="menu-center"
                  >
                    <li className="nav-item nosublnk">
                      <a
                        className="nav-link bidevices transpinkbtn"
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#exampleModalCenter2"
                      >
                        Need an architect?{' '}
                      </a>
                    </li>
                    <li className="nav-item nosublnk">
                      <a
                        className="nav-link bidevices transpinkbtn"
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                      >
                        Need Interior?
                      </a>
                    </li>
                    <li className="nav-item nosublnk">
                      <a
                        className="nav-link bidevices transpinkbtn"
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                      >
                        Bulk Order
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="outer-optns">
                {isAnyChecked() && (
                  <a
                    className="rstcts"
                    href="javascript:void(0);"
                    onClick={resetCheckboxes}
                  >
                    Reset Filter
                  </a>
                )}

                <a
                  onClick={handleClick}
                  className="fnddels-pns eventctaall"
                  href="javascript:void(0);"
                >
                  Filter By: <i className="fal fa-filter" />
                </a>
              </div>
            </div>
          </nav>

          <div className="panelmain-tophdrs calentop">
            <div className="menuset clnfilter">
              <div className="calen-years">
                <div className="infounts">
                  <div className="txttps">
                    <h6>Year</h6>
                  </div>
                  <div className="txttps gotrnsflts">
                    <h6>2024</h6>
                    <div className="nxp-prevscta">
                      <i className="far fa-angle-left" />
                      <i className="far fa-angle-right" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pnl-itemsopns">
                <ul>
                  <li className="active">
                    <a href="#">January</a>
                  </li>
                  <li>
                    <a href="#">February</a>
                  </li>
                  <li>
                    <a href="#">March</a>
                  </li>
                  <li>
                    <a href="#">April</a>
                  </li>
                  <li>
                    <a href="#">May</a>
                  </li>
                  <li>
                    <a href="#">June</a>
                  </li>
                  <li>
                    <a href="#">July</a>
                  </li>
                  <li>
                    <a href="#">August</a>
                  </li>
                  <li>
                    <a href="#">September</a>
                  </li>
                  <li>
                    <a href="#">October</a>
                  </li>
                  <li>
                    <a href="#">November</a>
                  </li>
                  <li>
                    <a href="#">December</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={
              isActive ? 'opacmains eventsall openpnls' : 'opacmains eventsall'
            }
          >
            <div className="panelmain-tophdrs">
              <div className="menuset clnfilter">
                <div className="fltrbys" onClick={handleClick}>
                  <i className="fal fa-times closeallfltr" />
                </div>
                <div className="pnl-itemsopns">
                  <h2 className="categheads-u">Topics</h2>
                  <ul>
                    {topics &&
                      topics.map((topic, key) => (
                        <li key={topic.id}>
                          <div className="form-check form-check-inline">
                            <input
                              type="checkbox"
                              checked={!!checkedStatus[topic.id]}
                              onChange={() => handleCheckboxChange(topic.id)}
                              className="form-check-input"
                              value={topic.id}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={'inlineCheckbox1' + key}
                            >
                              {topic.name}
                            </label>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div
                className="dtsfiltrs allctsappl"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  paddingTop: '4vh',
                }}
              >
                <button className="aplctas" onClick={() => getCheckedIds()}>
                  Apply
                </button>
              </div>
            </div>
          </div>
          <div className="panelmain-tophdrs showsalls">
            <div className="menuset clnfilter">
              <div className="pnl-itemsopns"></div>
              <div className="fltrbys">
                <p>
                  Filter By: <i className="fal fa-filter" />
                </p>
                <div className="dtsfiltrs">
                  <button className="aplctas">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="htmcolls-mn">
          <section className="emi-shws ptp-7 ptb-7">
            <div className="social-gridswbs">
              <div className="container">
                <div className="card-columnsss">
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}
                  >
                    <Masonry columnsCount="4" gutter="20px">
                      {productionData &&
                        productionData.map((listing, key) => (
                          <div key={key}>
                            {listing.custom_field && (
                              <>{ReactHtmlParser(listing.custom_field)}</>
                            )}

                            {!listing.custom_field && (
                              <a onClick={openModal} className="goview-cta">
                                <div
                                  className="card"
                                  onClick={() => SetNewObject(listing)}
                                >
                                  <div className="prod-shws">
                                    <div className="post-hndls">
                                      <a
                                        target="_blank"
                                        href={listing.external_link}
                                      >
                                        {listing.platform.split(',')[0] ==
                                          'FB' && (
                                          <>
                                            @{listing.platform.split(',')[1]}
                                            <img src="/images/faceigs.png" />
                                          </>
                                        )}

                                        {listing.platform.split(',')[0] ==
                                          'IG' && (
                                          <>
                                            @{listing.platform.split(',')[1]}
                                            <img src="/images/insta.png" />
                                          </>
                                        )}

                                        {listing.platform.split(',')[0] ==
                                          'YT' && (
                                          <>
                                            @{listing.platform.split(',')[1]}
                                            <img src="/images/youtube.png" />
                                          </>
                                        )}

                                        {listing.platform.split(',')[0] ==
                                          'X' && (
                                          <>
                                            @{listing.platform.split(',')[1]}
                                            <img src="/images/twitterx.png" />
                                          </>
                                        )}

                                        {listing.platform.split(',')[0] ==
                                          'others' && (
                                          <>{listing.platform.split(',')[1]}</>
                                        )}
                                      </a>
                                    </div>
                                    <div className="pst-socmains">
                                      {listing.thumbnail != '' && (
                                        <img
                                          className="social-assts"
                                          src={`https://res.cloudinary.com/dixxvh4rf/image/upload/q_auto/${listing.thumbnail.replace(
                                            / /g,
                                            '_',
                                          )}`}
                                          alt
                                        />
                                      )}

                                      {listing.thumbnail == '' && (
                                        <img
                                          className="social-assts"
                                          src={`https://res.cloudinary.com/dixxvh4rf/image/upload/q_auto/7_IG_Jan.jpg`}
                                          alt
                                        />
                                      )}

                                      {listing.post_type == 'video' && (
                                        <>
                                          <img
                                            src="./images/vdo-icon.png"
                                            class="vdopl-ns"
                                          />
                                        </>
                                      )}

                                      <div className="bottom-txt">
                                        <h3 className="post-tts">
                                          {listing.name}
                                        </h3>
                                        <p className="subs-descs">
                                          {listing.short_description}
                                        </p>

                                        <p className="dtpst">
                                          {formatDate(listing.publish_date)}
                                        </p>
                                      </div>
                                     
                                      {/*<div className="vwcentrs text-center">
                                        <a
                                          onClick={openModal}
                                          href="#"
                                          className="goview-cta"
                                        >
                                          View
                                        </a>
                                      </div> */}
                                    </div>
                                  </div>
                                </div>
                              </a>
                            )}
                          </div>
                        ))}
                    </Masonry>
                  </ResponsiveMasonry>
                </div>
              </div>
            </div>
          </section>

          {loading && (
            <div className="prodsct">
              <Skeleton count={5} />
            </div>
          )}

          {error && <p>Error: {error.message}</p>}
          {!loading && hasMore && (
            <InfiniteScroll
              filtersLoadMoreData={filtersLoadMoreData}
              hasMore={hasMore}
            />
          )}
          {!loading && !hasMore && (
            <p className="nmi">No more items to load.</p>
          )}

          <div
            className={isActiveConModal ? 'modal fade show' : 'modal fade'}
            id="exampleModal-11"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel-11"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="crs-mdls">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="post-holder imagefrm-single">
                    <div className="main-pstimgs">
                      <img src="./images/social-all/news/2.png" />
                    </div>
                    <h3 className="post-tts">Lorem IPSUM</h3>
                    <p className="subs-descs">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis ipsum suspendisse ultrices gravida. Risus
                      commodo viverra maecenas accumsan lacus vel facilisis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

         <div className='nws-loadfst'>
           <img src='./images/pulse-monitor-gray3.png?v=3' />
         </div>

      </div>
    </>
  )
}
