import React from 'react';
import chai, { expect } from 'chai';
import { mount } from 'enzyme';
import { Tab, Tabs as ToolboxTabs } from 'react-toolbox';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Tabs from './tabs';

chai.use(sinonChai);

describe('Tabs', () => {
  const history = {
    location: {
      pathname: '/main/voting',
    },
    push: sinon.spy(),
  };

  it('should render react toolbox Tabs component', () => {
    const wrapper = mount(<Tabs history={history} />);
    expect(wrapper.find(ToolboxTabs).exists()).to.equal(true);
  });

  it('should render 3 Tab components if props.isDelegate', () => {
    const wrapper = mount(<Tabs isDelegate={true} history={history} />);
    expect(wrapper.find(Tab)).to.have.lengthOf(3);
  });

  it('should render 2 Tab components if !props.isDelegate', () => {
    const wrapper = mount(<Tabs isDelegate={false} history={history} />);
    expect(wrapper.find(Tab)).to.have.lengthOf(2);
  });

  it('should allow to change active tab', () => {
    const wrapper = mount(<Tabs isDelegate={false} history={history} />);
    wrapper.find(Tab).at(0).simulate('click');
    expect(history.push).to.have.been.calledWith('transactions');
  });
});
