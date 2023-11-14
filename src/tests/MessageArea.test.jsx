import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import MessageArea from "../components/Homepage/MessageArea";

test ("render MessageArea", () => {
    render(<MessageArea />);
})