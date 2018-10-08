import React from 'react';
import { Menu } from '@mybit/ui';
import { Header, Footer, Background } from './components';


const MainLayout = (props) => {
    return (
        <Background>
            <Header>
                <Menu
                    onClick={() => {}}
                    selectedKeys={['Developer']}
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
                            linkTo: 'https://mybit.io/applications',
                            target: '_top',
                        }
                    ]}
                    styling={{
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        itemHoverColor: 'blue',
                        itemSelectedColor: 'blue',
                        borderBottom: `2px solid ${'blue'}`,
                        backgroundColorItem: 'lightBlue',
                    }}
                    className="navigation--is-desktop"
                />
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