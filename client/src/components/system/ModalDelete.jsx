import { Button, Modal } from 'flowbite-react';
import { TbInfoTriangleFilled } from 'react-icons/tb';

const ModalDelete = (props) => {
    return (
        <>
            <Modal>
                <Modal.Header>
                    <div className="flex space-x-3">
                        <TbInfoTriangleFilled className="text-3xl text-red-600" />
                        <p>Delete Account</p>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p>
                            Bạn chắc chắn muốn xóa <span class="font-bold">{props}</span> này?
                        </p>{' '}
                        <p>Hành động này không thể khôi phục lại.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    <Button color="failure">Xóa tài khoản</Button>
                    <Button color="gray">Thoát</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDelete;
