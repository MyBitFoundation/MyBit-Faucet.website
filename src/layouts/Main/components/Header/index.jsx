import React from 'react';
import { AccountInfo } from '@mybit/ui';
import StyledHeader from './styledHeader';
import { myBitLogoWhite } from '../../../../modules/Images';
import BlockchainContext from '../../../../modules/Blockchain/containers/BlockchainInfoContext';

const BlockchainConsumer = BlockchainContext.Consumer;
const Header = (props) => (
    <BlockchainConsumer>
        {({user}) => (
            <header id="main-header">
                <StyledHeader>
                <img width={100} src={myBitLogoWhite} alt="MyBit logo"/>
                <div>
                    {props.children}
                </div>
                <AccountInfo 
                    myBitBalance={user.myBitBalance} 
                    ethBalance={user.ethBalance} 
                    userName={user.userName}
                />
                </StyledHeader>
            </header>
        )}
    </BlockchainConsumer>
)

export default Header;