import icon_black from '../icons/icon-black.svg'
import React from "react";
import './Footer.css';

function Footer() {
    return (
        <footer className="page-footer" style={{"font":"small", "backgroundColor":"rgba(237,239,241,1)"}}>
            <div>
                {/*Icon + Text*/}
                <div className="footer py-3 " style={{'textAlign': 'left'}}>
                    <a href="/#" style={{'paddingLeft':'10px'}}>     </a>
                    <img src={(icon_black)} alt="" width="24" height="24" className="icon" />
                    <a href="/#" style={{'paddingLeft':'20px', 'color':"rgba(34,37,41,1)"}}>  MyEstate</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
