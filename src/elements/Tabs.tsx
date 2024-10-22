import React, { useState } from 'react';
import { TabContentProps, TabProps, TabsProps } from 'types/type';

const Tabs: React.FC<TabsProps> = ({
  active = 0,
  onTabChange,
  children,
  color = 'blue',
  orientation = 'horizontal',
  position = 'left',
  variant = 'default',
  styles,
  classNames
}) => {
  const [activeTab, setActiveTab] = useState<number>(active);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[];

  return (
    <div className={`tabs ${orientation} ${variant} ${styles?.root ?? ''} ${classNames?.root ?? ''}`}>
      <div className={`tabs-header ${position} ${styles?.header ?? ''} ${classNames?.header ?? ''}`}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab ${activeTab === index ? 'active' : ''} ${styles?.tab ?? ''} ${classNames?.tab ?? ''}`}
            style={{ color: activeTab === index ? color : undefined }}
            onClick={() => handleTabChange(index)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className={`tabs-content ${styles?.content ?? ''} ${classNames?.content ?? ''}`}>
        {tabs[activeTab]?.props.children}
      </div>
    </div>
  );
};

export const Tab: React.FC<TabProps> = ({ label, children }) => {
  return (
    <div className="tab-content">
      <h3 className="tab-label">{label}</h3>
      {children}
    </div>
  );
};

export const TabContent: React.FC<TabContentProps> = ({ children }) => {
  return <>{children}</>;
};

export default Tabs;
