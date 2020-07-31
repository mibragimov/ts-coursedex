import React from 'react';
import { ErrorMessage } from './Error';

interface ErrorBoundaryState {
  isError: boolean | Error;
}
interface ErrorBoundaryProps {}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      isError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { isError: true };
  }

  componentDidCatch(error: Error, errorInfo: Object): void {
    console.log(error);
  }

  render(): JSX.Element | React.ReactNode {
    if (this.state.isError) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}
