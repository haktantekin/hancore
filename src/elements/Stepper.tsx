import React, { useState } from 'react';
import { StepperProps, StepProps } from 'types/type';

const Stepper: React.FC<StepperProps> = ({
  active = 0,
  onStepClick,
  color = 'blue',
  iconSize = 24,
  orientation = 'horizontal',
  size = 'md',
  children,
  allowNextStepsSelect = false,
  completedIcon,
  contentPadding = 'md',
  iconPosition = 'left',
  styles,
  classNames,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(active);

  const handleStepClick = (index: number) => {
    if (allowNextStepsSelect && onStepClick) {
      onStepClick(index);
    } else {
      setCurrentStep(index);
    }
  };

  const steps = React.Children.toArray(children) as React.ReactElement<StepProps>[];

  return (
    <div className={`stepper ${orientation} ${size} ${styles?.root ?? ''} ${classNames?.root ?? ''}`}>
      <div className="stepper-header" style={{ padding: contentPadding }}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${currentStep === index ? 'active' : ''} ${styles?.step ?? ''} ${classNames?.step ?? ''}`}
            onClick={() => handleStepClick(index)}
            style={{ cursor: allowNextStepsSelect ? 'pointer' : 'default' }}
          >
            <div
              className={`step-icon ${iconPosition} ${styles?.stepIcon ?? ''} ${classNames?.stepIcon ?? ''}`}
              style={{ fontSize: iconSize, color: currentStep === index ? color : undefined }}
            >
              {currentStep > index && completedIcon ? completedIcon : step.props.icon}
            </div>
            <div className={`step-label ${styles?.stepLabel ?? ''} ${classNames?.stepLabel ?? ''}`}>
              {step.props.label}
            </div>
          </div>
        ))}
      </div>
      <div className="stepper-content">
        {steps[currentStep].props.children}
      </div>
    </div>
  );
};

export default Stepper;
