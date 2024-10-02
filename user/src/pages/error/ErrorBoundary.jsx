import React from 'react';
import Loading from '../../Components/Loading';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='h-screen w-screen flex justify-center items-center'>
          <Loading title='Something went wrong, please refresh the page' />
        </div>
      )
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;
