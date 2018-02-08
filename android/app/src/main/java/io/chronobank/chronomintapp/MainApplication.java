package io.chronobank.chronomintapp;

import android.support.annotation.Nullable;
import com.bitgo.randombytes.RandomBytesPackage;
import com.reactnativenavigation.NavigationApplication;
import com.facebook.react.ReactApplication;
import com.peel.react.rnos.RNOSModule;
import com.tradle.react.UdpSocketsModule;
import com.peel.react.TcpSocketsModule;
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
      // Make sure you are using BuildConfig from your own application
      return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
          new ReactNativeFingerprintScannerPackage(),
          new ReactNativeDocumentPicker(),
          new RNDeviceInfo(),
          new RNOSModule(),
          new ReactNativeLocalizationPackage(),
          new RandomBytesPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
      return getPackages();
  }

  @Override
  public String getJSMainModuleName() {
    return "index";
  }
}
