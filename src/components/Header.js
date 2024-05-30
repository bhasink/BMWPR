import Image from 'next/image'
import { useState,useEffect } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'
// import "bootstrap";

const Header = () => {

  const [isActive, setIsActive] = useState(false);
  const [isActiveConModal, setIsActiveConModal] = useState(false);


  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleClickSearch = () => {
    setIsActiveConModal(!isActive);
  };


    return (
   
      <header className="site-header topmain mobexheight norm">
      <nav className="navbar navbar-expand-lg navbar-lg-light">
        <div className="container">
          {/* Brand */}
          <a className="navbar-brand" href="index.html">
            <img src="./images/pulse-monitor-gray3.png?v=3" className="navbar-brand-img" alt="logo" />
          </a>
          {/* Collapse */}
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="mobile-widgets">
              <div className="cross" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="true" aria-label="Toggle navigation">
                <i className="fal fa-times" />
              </div>
            </div>
            {/* Navigation */}
            <div className="mr-auto showinner" id="accordionExample">
              <ul className="navbar-nav ml-auto position-relative" id="menu-center">
                <li className="nav-item nosublnk">
                  <a className="nav-link bidevices transpinkbtn" href="javascript:void(0);" data-toggle="modal" data-target="#exampleModalCenter2">Need an architect? </a>
                </li>
                <li className="nav-item nosublnk">
                  <a className="nav-link bidevices transpinkbtn" href="javascript:void(0);" data-toggle="modal" data-target="#exampleModalCenter">Need Interior?</a>
                </li>
                <li className="nav-item nosublnk">
                  <a className="nav-link bidevices transpinkbtn" href="javascript:void(0);" data-toggle="modal" data-target="#exampleModalCenter">Bulk Order</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="outer-optns">
            {/*<a href="#" class="br-bld"><i class="fas fa-bars"></i> Menu</a> */}
            <a onClick={handleClickSearch} className="srch-pns " href="javascript:void(0);"><i className="far fa-search" /></a>
            {/*<a class="fnddels-pns clnctamn" href="javascript:void(0);"><i class="far fa-angle-down"></i> Calendar</a> */}
            <a  onClick={handleClick} className="fnddels-pns eventctaall" href="javascript:void(0);">Filter By: <i className="fal fa-filter" /></a>
            {/*<a class="fnddels-pns eventctaall" href="javascript:void(0);"><i class="far fa-angle-down"></i> Topics</a>
            <a class="fnddels-pns shwallscta" href="javascript:void(0);"><i class="far fa-angle-down"></i> Platforms</a>*/}
          </div>
          {/* Toggler
        <button class="navbar-toggler openhdas" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fal fa-bars"></i>
            <i class="fal fa-times"></i>
        </button>  */}
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
              <li className="active"><a href="#">January</a></li>
              <li><a href="#">February</a></li>
              <li><a href="#">March</a></li>
              <li><a href="#">April</a></li>
              <li><a href="#">May</a></li>
              <li><a href="#">June</a></li>
              <li><a href="#">July</a></li>
              <li><a href="#">August</a></li>
              <li><a href="#">September</a></li>
              <li><a href="#">October</a></li>
              <li><a href="#">November</a></li>
              <li><a href="#">December</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={isActive ? 'opacmains eventsall openpnls' : 'opacmains eventsall'}>
        <div className="panelmain-tophdrs">
          <div className="menuset clnfilter">
            <div className="fltrbys">
              <i className="fal fa-times closeallfltr" />
              <h2 className="categheads-u">Date Range</h2>
              <div className="dtsfiltrs">
                <input type="input" className="form-control" id="inputDate" placeholder="Start Date" />
                <input type="input" className="form-control" id="inputDate2" placeholder="End Date" />
              </div>
            </div>
            <div className="pnl-itemsopns">
            <i class="fal fa-times closeallfltr"></i>
              <h2 className="categheads-u">Topics</h2>
              <ul>
                <li>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" defaultValue="option1" />
                    <label className="form-check-label" htmlFor="inlineCheckbox1">Corporate</label>
                  </div>
                </li>
                <li>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" defaultValue="option2" />
                    <label className="form-check-label" htmlFor="inlineCheckbox2">Product</label>
                  </div>
                </li>
                <li>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox3" defaultValue="option3" />
                    <label className="form-check-label" htmlFor="inlineCheckbox3">Marketing</label>
                  </div>
                </li>
                <li>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox4" defaultValue="option4" />
                    <label className="form-check-label" htmlFor="inlineCheckbox4">Internal</label>
                  </div>
                </li>
                <li>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox51" defaultValue="option51" />
                    <label className="form-check-label" htmlFor="inlineCheckbox51">Dealer Network</label>
                  </div>
                </li>
                <li>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox5" defaultValue="option5" />
                    <label className="form-check-label" htmlFor="inlineCheckbox5">After Sales</label>
                  </div>
                </li>
                <li>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox6" defaultValue="option6" />
                    <label className="form-check-label" htmlFor="inlineCheckbox6">Drives / Rides</label>
                  </div>
                </li>
                {/*<li><a href="#">Launch Events</a></li>
         <li><a href="#">Annual Sales Reports</a></li>
         <li><a href="#">Rides</a></li>
         <li><a href="#">Promotional Events</a></li> */}
              </ul>
            </div>
            <div className="pnl-itemsopns">
              <h2 className="categheads-u">Platforms</h2>
              <ul>
                <li>
                  <div className="form-check form-check-inline onescw">
                    <label className="form-check-label" htmlFor="inlineCheckbox7">Social <i className="far fa-angle-down" /></label>
                  </div>
                </li>
              </ul>
              <ul>
                <li>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox8" defaultValue="option8" />
                    <label className="form-check-label" htmlFor="inlineCheckbox8">Facebook </label>
                  </div>
                </li>
                <li>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox88" defaultValue="option88" />
                    <label className="form-check-label" htmlFor="inlineCheckbox88">Instagram </label>
                  </div>
                </li>
                <li>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox89" defaultValue="option89" />
                    <label className="form-check-label" htmlFor="inlineCheckbox89">Twitter </label>
                  </div>
                </li>
                <li>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox99" defaultValue="option99" />
                    <label className="form-check-label" htmlFor="inlineCheckbox99">YouTube </label>
                  </div>
                  <a href="#" /></li>
              </ul>
              <ul>
                <li>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox9" defaultValue="option9" />
                    <label className="form-check-label" htmlFor="inlineCheckbox9">Print </label>
                  </div>
                </li>
                <li>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox10" defaultValue="option10" />
                    <label className="form-check-label" htmlFor="inlineCheckbox10">Online </label>
                  </div>
                </li>
                <li>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox11" defaultValue="option11" />
                    <label className="form-check-label" htmlFor="inlineCheckbox11">TV </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="dtsfiltrs allctsappl" style={{display: 'block', textAlign: 'center', paddingTop: '4vh'}}>
            <button className="aplctas">Apply</button>
          </div>
        </div>
      </div>
      <div className="panelmain-tophdrs showsalls">
        <div className="menuset clnfilter">
          <div className="pnl-itemsopns">
          </div>
          <div className="fltrbys">
            <p>Filter By: <i className="fal fa-filter" /></p>
            <div className="dtsfiltrs">
              <button className="aplctas">Apply</button>
            </div>
          </div>
        </div>
      </div>
      <div className={isActiveConModal ? '"panelmain-tophdrs searchallmain openpnls' : '"panelmain-tophdrs searchallmain'}>
        <div className="global-srchbrs">
          <div className="mnclosd"><i className="far fa-times" /> </div>
          <div className="srch-inps"><input type="text" placeholder="Your Search Request" /></div>
        </div>
      </div>
    </header>

    );
  }
  
  export default Header