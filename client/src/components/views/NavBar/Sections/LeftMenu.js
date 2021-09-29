import React from 'react';
import { Menu } from 'antd';
import '../../../../App.scss';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

function LeftMenu(props) {
  return (
    <div className="leftmenu" >
      
{/*     
  <Button onClick={() => imageClick()}   */}
  <Link to={'/favorite'}>
  <Button variant="warning">WATCHLIST</Button>{' '}
</Link>
        {/* <Button variant="warning"><a href="/favorite">Favorites</a></Button>{' '} */}
  
    </div>
  )
}

export default LeftMenu