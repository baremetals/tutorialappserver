import Modal from "components/ShareForm/Modal";
import { useState } from "react";


const form = () => {
    const [showModal, setShowModal] = useState(true);

    return (
      <>
        <Modal showModal={showModal} closeM={() => setShowModal(false)} />
      </>
    );
}

export default form
