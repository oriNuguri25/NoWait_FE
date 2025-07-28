import React, { useEffect, useMemo, useState } from "react";
import placeholderIcon from "../../../assets/image_placeholder.svg";
import editOrderIcon from "../../../assets/edit_order_icon.svg";
import ToggleSwitch from "../../AdminHome/components/ToggleSwitch";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MenuModal from "../components/menuModal";
import { useCreateMenu } from "../../../hooks/booth/menu/useCreateMenu";
import { useUploadMenuImage } from "../../../hooks/booth/useUploadMenuImage";
import { useGetAllMenus } from "../../../hooks/booth/menu/useGetAllMenus";

interface Menu {
  id: number;
  name: string;
  description: string;
  price: number;
  soldOut: boolean;
  imageUrl?: string;
}

const MenuSection = () => {
  const [editMode, setEditMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<any>(null);
  const { data: fetchedMenus = [], isLoading } = useGetAllMenus(1);
  const { mutate: createMenu } = useCreateMenu();
  const { mutate: uploadMenuImage } = useUploadMenuImage();
  const [menus, setMenus] = useState<Menu[]>([]);

  const openEditModal = (menu: any) => {
    setSelectedMenu(menu);
    setIsEditModalOpen(true);
  };

  const handleAddMenu = (newMenu: {
    name: string;
    description: string;
    price: string;
    image?: File;
  }) => {
    const payload = {
      storeId: 1,
      //   나중에 실제 storeId로 바꾸어야함
      name: newMenu.name,
      description: newMenu.description,
      price: parseInt(newMenu.price.replace(/[^0-9]/g, ""), 10),
    };

    createMenu(payload, {
      onSuccess: (data) => {
        // axios 응답 res.data를 반환했으므로 data 는 아래 형태
        // { success: true, response: { menuId, storeId, name, description, price, isSoldOut, … } }
        const created = data.response;
        console.log(created, "생성된 메뉴");

        // 상태에 넣을 새 객체
        const menuItem: Menu = {
          id: created.menuId,
          name: created.name,
          description: created.description,
          price: created.price,
          soldOut: created.isSoldOut,
          // imageUrl은 업로드 후에 업데이트
        };
        // 일단 메뉴 배열에 추가
        setMenus((prev) => [...prev, menuItem]);
        setIsAddModalOpen(false);

        // 이미지가 있으면 업로드하고, 성공 시 imageUrl 필드만 state에 patch
        if (newMenu.image) {
          uploadMenuImage(
            {
              menuId: created.menuId,
              image: newMenu.image,
            },
            {
              onSuccess: (imgData) => {
                const url = imgData.url;
                setMenus((prev) =>
                  prev.map((m) =>
                    m.id === created.menuId ? { ...m, imageUrl: url } : m
                  )
                );
              },
              onError: () => {
                alert("메뉴는 추가되었지만 이미지 업로드에 실패했습니다.");
              },
            }
          );
        } else {
          alert("메뉴가 성공적으로 추가되었습니다.");
        }
      },
      onError: () => {
        alert("메뉴 추가에 실패했습니다.");
      },
    });
  };

  const handleEditMenu = (updated: any) => {
    setMenus((prev) =>
      prev.map((menu) => (menu.name === selectedMenu.name ? updated : menu))
    );
  };

  const toggleSoldOut = (index: number) => {
    const updatedMenus = [...menus];
    updatedMenus[index].soldOut = !updatedMenus[index].soldOut;
    setMenus(updatedMenus);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reordered = Array.from(menus);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setMenus(reordered);
  };

  useEffect(() => {
    const transformed = fetchedMenus.map((menu) => ({
      id: menu.menuId,
      name: menu.name,
      description: menu.description,
      price: menu.price,
      soldOut: menu.isSoldOut,
      imageUrl: menu.images?.[0]?.imageUrl,
    }));
    setMenus(transformed);
  }, [fetchedMenus]);

  return (
    <div className="mt-[40px] mb-[20px]">
      <div className="flex justify-between items-center mb-[20px]">
        <h2 className="text-title-18-bold">메뉴</h2>
        <div className="flex gap-[10px]">
          <button
            className="text-sm px-4 py-2 bg-black-5 text-black-80 rounded-[8px]"
            onClick={() => setEditMode((prev) => !prev)}
          >
            {editMode ? "편집 완료" : "순서 편집"}
          </button>
          <button
            className="text-sm px-4 py-2 bg-black-5 text-black-80 rounded-[8px]"
            onClick={() => setIsAddModalOpen(true)}
          >
            메뉴 추가 +
          </button>
        </div>
      </div>

      <div className="flex justify-between mb-[10px]">
        <p className="text-sm text-black-40 mb-2">{menus.length}개의 메뉴</p>
        {!editMode && <p className="text-sm text-black-40 mb-2">품절 표시</p>}
      </div>

      <div className="border-t border-[#EEEEEE]">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable
            droppableId="menu-list"
            isDropDisabled={!editMode}
            direction="vertical"
            // isCombineEnabled={false}
            // ignoreContainerClipping={false}
          >
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {menus.map((menu, idx) => (
                  <Draggable
                    key={`menu-${idx}`}
                    draggableId={`menu-${idx}`}
                    index={idx}
                    isDragDisabled={!editMode}
                  >
                    {(provided) => (
                      <div
                        className="flex justify-between items-center py-4"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...(editMode ? provided.dragHandleProps : {})}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-[48px] h-[48px] bg-black-5 rounded-md flex items-center justify-center overflow-hidden"
                            onClick={() => !editMode && openEditModal(menu)}
                          >
                            <img
                              src={menu.imageUrl}
                              className="w-full h-full object-cover"
                              alt="placeholder"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold">
                              {menu.name}
                            </span>
                            <span className="text-sm text-black-60">
                              {menu.price}
                            </span>
                          </div>
                        </div>

                        <div className="text-sm text-black-60">
                          {editMode ? (
                            <img
                              src={editOrderIcon}
                              alt="순서 변경"
                              className="w-5 h-5"
                              {...provided.dragHandleProps}
                            />
                          ) : (
                            <ToggleSwitch
                              isOn={menu.soldOut}
                              toggle={() => toggleSoldOut(idx)}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {isAddModalOpen && (
        <MenuModal
          isEdit={false}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddMenu}
        />
      )}
      {isEditModalOpen && selectedMenu && (
        <MenuModal
          isEdit={true}
          initialData={selectedMenu}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditMenu}
        />
      )}
    </div>
  );
};

export default MenuSection;
