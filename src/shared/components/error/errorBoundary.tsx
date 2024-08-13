import { Component, ComponentType, PropsWithChildren } from 'react';
import { ErrorProps } from './errorFallback';

export class HTTPError extends Error {
  statusCode: number;

  constructor(statusCode: number, message?: string) {
    super(message);
    this.name = 'HTTPError';
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}

interface ErrorBoundaryProps extends PropsWithChildren {
  FallBack: ComponentType<ErrorProps>;
  onReset?: (error: Error | HTTPError) => void;
}

interface ErrorBoundaryType {
  hasError: boolean;
  error: Error | HTTPError | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryType> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
    this.captureReject = this.captureReject.bind(this);
    this.handleResetErrorBoundary = this.handleResetErrorBoundary.bind(this);
  }

  componentDidMount() {
    window.addEventListener('unhandledrejection', this.captureReject);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.captureReject);
  }

  captureReject(e: PromiseRejectionEvent) {
    e.preventDefault();

    this.setState({ hasError: true, error: e.reason });
  }

  handleResetErrorBoundary() {
    const { onReset } = this.props;
    const { error } = this.state;

    onReset?.(error!);
    this.setState({ hasError: false, error: null });
  }

  render() {
    const { FallBack, children } = this.props;
    const { hasError, error } = this.state;
    if (hasError) {
      return (
        <FallBack
          statusCode={error instanceof HTTPError ? error.statusCode : undefined}
          resetError={this.handleResetErrorBoundary}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
