import { Button, Modal } from "react-bootstrap"
import { useRecoilState, useRecoilValue } from "recoil";
import { showState, darkModeState } from "../../atoms";
import CreateArticle from "../CreateArticle";
import styles from '../../styles/Modal.module.scss'

export default function CreateModal() {

    // eslint-disable-next-line no-unused-vars
    const [show, setShow] = useRecoilState(showState)
    const handleClose = () => setShow(false)
    const darkMode = useRecoilValue(darkModeState)
    const check: boolean = darkMode === false

    return (
        <>
            <Modal className={check ? styles.modal : styles.modalDark} show={show} size='lg' centered onHide={handleClose}>
                <div className={styles.modalcontent}>
                    <Modal.Header className={styles.modalheader}>
                        <Modal.Title id="contained-modal-title-vcenter">
                        </Modal.Title>
                        <div className='ml-auto'>
                            <Button onClick={handleClose}
                                className={styles.closeBtn}>
                                ❌
                            </Button>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateArticle />
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
}