export class Menu {
  public static menus = [
    {
      name: 'Quản lý hệ học',
      icon: 'fas fa-fw fa-tachometer-alt',
      route: '/main/hehoc/index',
      children: [
        {
          name: 'Hiển thị hệ học',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/hehoc/index',
        },
        {
          name: 'Thêm hệ học',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/hehoc/create',
        },
      ],
    },
    {
      name: 'Quản lý lớp học',
      icon: 'fas fa-fw fa-tachometer-alt',
      route: '/main/lophoc/index',
      children: [
        {
          name: 'Hiển thị lớp học',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/lophoc/index',
        },
        {
          name: 'Thêm lớp học',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/lophoc/create',
        },
      ],
    },
    {
      name: 'Quản lý giáo viên',
      icon: 'fas fa-fw fa-tachometer-alt',
      route: '/main/giaovien/index',
      children: [
        {
          name: 'Hiển thị giáo viên',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/giaovien/index',
        },
        {
          name: 'Thêm giáo viên',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/giaovien/create',
        },
      ],
    },
    {
      name: 'Quản lý học sinh',
      icon: 'fas fa-fw fa-tachometer-alt',
      route: '/main/hocsinh/index',
      children: [
        {
          name: 'Hiển thị học sinh',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/hocsinh/index',
        },
        {
          name: 'Thêm học sinh',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/hocsinh/create',
        },
      ],
    },

    {
      name: 'Quản lý khoản thu',
      icon: 'fas fa-fw fa-tachometer-alt',
      route: '/main/khoanthu/index',
      children: [
        {
          name: 'Hiển thị khoản thu',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/khoanthu/index',
        },
        {
          name: 'Thêm khoản thu',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/khoanthu/create',
        },
      ],
    },
    {
      name: 'Quản lý phiếu thu',
      icon: 'fas fa-fw fa-tachometer-alt',
      route: '/main/phieuthu/index',
      children: [
        {
          name: 'Hiển thị phiếu thu',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/phieuthu/index',
        },
        {
          name: 'Thêm phiếu thu',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/phieuthu/create',
        },
      ],
    },
    {
      name: 'Quản lý khoản chi',
      icon: 'fas fa-fw fa-tachometer-alt',
      route: '/main/khoanchi/index',
      children: [
        {
          name: 'Hiển thị khoản chi',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/khoanchi/index',
        },
        {
          name: 'Thêm khoản chi',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/khoanchi/create',
        },
      ],
    },
    {
      name: 'Quản lý phiếu chi',
      icon: 'fas fa-fw fa-tachometer-alt',
      route: '/main/phieuchi/index',
      children: [
        {
          name: 'Hiển thị phiếu chi',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/phieuchi/index',
        },
        {
          name: 'Thêm phiếu chi',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/phieuchi/create',
        },
      ],
    },
    {
      name: 'Quản lý  người dùng',
      icon: 'fas fa-fw fa-tachometer-alt',
      route: '/main/user/index',
      children: [
        {
          name: 'Hiển thị  người dùng',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/user/index',
        },
        {
          name: 'Thêm người dùng',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/user/create',
        },
      ],
    },
    {
      name: 'Quản lý quyền',
      icon: 'fas fa-fw fa-tachometer-alt',
      route: '/main/permision/index',
      children: [
        {
          name: 'Hiển thị quyền',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/permision/index',
        },
        {
          name: 'Thêm  quyền',
          icon: 'fas fa-fw fa-tachometer-alt',
          route: '/main/permision/create',
        },
      ],
    },
  ];
}
