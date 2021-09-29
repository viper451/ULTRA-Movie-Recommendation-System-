import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Icon } from '@ant-design/compatible';
import { useHistory } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import './Sections/Navbar.css';

function NavBar() {
  const [visible, setVisible] = useState(false)
  const history = useHistory();
  const showDrawer = () => {
    setVisible(true)
  };

  function handleCheck(){
    history.push(`/`);
}


  const onClose = () => {
    setVisible(false)
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      duration:5 

    });
  };
  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      
      <div className="menu__logo">
     
        <div onClick={() => scrollToTop()} style={{ color: 'white', fontWeight: 'bolder',fontSize:'24px' }} >ULTRA</div>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div>
        <button
                                class='btn btn-dark-info'
                                type='button'
                                onClick={() => {
                                    handleCheck();
                                }}>
                                BROWSE
                            </button>
          </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="FOI 2021"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar