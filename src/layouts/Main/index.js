import React from 'react';
// import { Menu } from '@mybit/ui';
import Menu from '@bit/mybit.ui.showcase.menu';
import { Header, Footer, Background } from './components';

const MainLayout = (props) => {
    return (
        <Background>
            <Header>
                {/* <Menu
                    onClick={() => {}}
                    selectedKeys={['Request ETH']}
                    mode="horizontal"
                    items={[
                        {
                            name: 'Request ETH',
                            linkTo: '/',
                            target: '_top',
                        }, {
                            name: 'Donate ETH',
                            linkTo: 'https://mybit.io/fund',
                            target: '_top',
                        }, {
                            name: 'Transactions',
                            linkTo: '/transactions',
                            target: '_top',
                        }
                    ]}
                    // className="navigation--is-desktop"
                /> */}
            </Header>
            <main id="main-content">
                {props.children}
            </main>
            <Footer>
                child
            </Footer>
        </Background>
    )
}

export default MainLayout;
