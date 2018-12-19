import React, { Component } from 'react';
import dayjs from 'dayjs'
import { notification, Modal, Spin } from 'antd';
import 'antd/lib/notification/style/css'
import 'antd/lib/modal/style/css'
import ConnectionStatus from '@bit/mybit.ui.kit.connection-status';
import Button from '@bit/mybit.ui.kit.button';
import styled from 'styled-components';
import { MainLayout } from '../../layouts/index.js';
import { secureGraphic } from '../../modules/Images';
import BlockchainContext from '../../modules/Blockchain/containers/BlockchainInfoContext';
const StyledFormContainer = styled.div`
    display: flex;
    justify-content: center;
    form {
        background: #fff;
        border-radius: 3px;
        color: #333;
        display: flex;
        flex-direction: column;
        max-width: 400px;
        min-width: 320px;
        width: 100%;
        min-height: 500px;
        overflow: hidden;
        padding: 60px;
    }
`

class HomeViewContainer extends Component {
    render() {
        return (
            <BlockchainContext.Consumer>
                {blockchain => <HomeView blockchain={blockchain}/>}
            </ BlockchainContext.Consumer>
        )
    }
}

class HomeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMetamaskModal: true,
            userAddress: null,
            amount: 0,
        }
    }
    componentDidMount() {
        if(window.ethereum) {
            this.setState({showMetamaskModal: false})
        }
    }
    handleAddressChange = (e) => {
        this.setState({
            userAddress: e.target.value
        })
    }
    handleAmountChange = (e) => {
        this.setState({ amount: e })
    }
    componentDidUpdate() {
        const { blockchain } = this.props;
        if(blockchain.showSuccess && blockchain.showSuccess.status === true) {
            blockchain.dismissMessages(() => {
                notification.success({
                    message: 'Transaction successful',
                    description: 'Received ' + (blockchain.showSuccess.events.LogWithdraw.returnValues._amountMYB / 1000000000000000000).toFixed(5) + ' MYB',
                    duration: 0
                  })
            })
        }
        if(blockchain.showFail === true) {
            blockchain.dismissMessages(() => {
                notification.error({
                    message: 'Transaction failed',
                    description: 'Something went wrong. Please try again.',
                    duration: 0
                  })
            })
        }
    }

    render() {
        const { blockchain} = this.props
        const isLoading = Object.keys(blockchain.loading).filter(key => blockchain.loading[key]).length > 0;
        return (
            <MainLayout>
                <Modal
                    title="You need the MetaMask extension to use the faucet."
                    closable={false}
                    visible={this.state.showMetamaskModal}
                    onOk={() => {}}
                    onCancel={() => {}}
                    footer={null}
                    >
                    <a href="http://metamask.io" target="_blank">
                        <img style={{maxWidth: '100%'}} src="https://raw.githubusercontent.com/MetaMask/faq/master/images/download-metamask.png" alt="download MetaMask"/>
                    </a>
                </Modal>
                <Modal
                    title="Wrong network"
                    closable={false}
                    visible={blockchain.network && blockchain.network !== 'ropsten'}
                    onOk={() => {}}
                    onCancel={() => {}}
                    footer={null}
                    >
                    Please switch to Ropsten Test Network in order to use MyBit Faucet.
                </Modal>
                <StyledFormContainer>
                    <form>
                        <ConnectionStatus network={blockchain.network} />
                        <img style={{ marginBottom: '60px'}} src={secureGraphic} alt="Secure Connection" />
                        
                        <br/>
                        {
                            isLoading && 
                            <div style={{textAlign: 'center'}}>
                                <Spin/><br/>
                                {blockchain.loading.transaction === true && 'Your transaction is being processed.'}
                            </div>
                        }
                        {
                            !isLoading &&
                            <div style={{textAlign: 'center'}}>
                                {blockchain.user.myBitBalance < 10000 &&
                                    <React.Fragment>
                                        <Button size="large" type="solid" onClick={e => blockchain.withdraw()}>{`Withdraw ${(10000 - blockchain.user.myBitBalance).toFixed(5)} MYB`}</Button>
                                        <br/>
                                        If you have less than 10 000 MYB tokens, the faucet will send you the difference.
                                    </React.Fragment>
                                }
                                {blockchain.user.myBitBalance >= 10000 && 
                                        <React.Fragment>
                                            You need to have less than 10 000 MYB tokens in order to use the faucet.
                                        </React.Fragment>
                                }
                            </div>
                        }

                    </form>
                </StyledFormContainer>
            </MainLayout>
        )
    }
}

export default HomeViewContainer