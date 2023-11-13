import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import MessageArea from "./MessageArea";

test ("render NavComms", () => {
    render(<MessageArea />);
})