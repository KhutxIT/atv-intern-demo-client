import { useState } from 'react';

export default function AddTagsToImage() {
  const [state, setState] = useState({
    x: 0,
    y: 0,
    value: '',
    displayInput: 'none',
    submitOnClick: false,
    open: true,
  });
}
