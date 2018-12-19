import React from 'react';
import { poweredByLogo } from '../../../../modules/Images';
import StyledFooter from './styledFooter';
const Footer = (props) => (
    <footer id="main-footer">
        <StyledFooter>
            <img src={poweredByLogo} alt="Powered by MyBit"/>
        </StyledFooter>
    </footer>
)

export default Footer;